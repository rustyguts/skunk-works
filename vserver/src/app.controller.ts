import * as mime from 'mime';
import * as path from 'path';
import * as fs from 'fs-extra';

import { AppService } from './app.service';
import { Request, Response } from 'express';
import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

const directory = process.env.DIRECTORY || 'tmp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth() {
    return {
      status: 'ok',
      message: 'healthy!',
      debug: {
        directory,
      },
    };
  }

  @Get('*')
  getFile(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile | NotFoundException {
    const filepath = this.appService.getFilepath(req.originalUrl);
    const filename = path.basename(filepath);
    const mimeType = mime.getType(filepath);

    if (!fs.existsSync(filepath)) {
      return new NotFoundException(`${filepath} not found`);
    }

    console.log({ filepath, filename, mimeType });
    const file = fs.createReadStream(filepath);

    res.set({
      'Content-Type': mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(file);
  }

  @Post('*')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: `${directory}/tmp`,
    }),
  )
  async uploadFile(
    @Req() req: Request,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const uploadDirectory = req.originalUrl;
    const uploadPath = `${directory}/${uploadDirectory}/${file.originalname}`;

    if (await fs.pathExists(uploadDirectory)) {
      console.log('upload directory exists');
    } else {
      console.log('upload directory does not exist, creating...');
      await fs.ensureDir(path.dirname(uploadPath));
    }

    console.log(req.originalUrl);
    console.log(file);

    await fs.move(file.path, uploadPath);
  }
}
