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
import { SentryInterceptor } from './sentry.interceptor';

const directory = process.env.DIRECTORY || '/data';

@UseInterceptors(SentryInterceptor)
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
    const filepath = path.normalize(path.join(directory, req.originalUrl));
    const filename = path.basename(filepath);
    const mimeType = mime.getType(filepath);

    if (!fs.existsSync(filepath)) {
      throw new NotFoundException(`${filepath} not found`);
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
    const uploadPath = `${directory}/${req.originalUrl}`;
    const uploadDir = path.dirname(uploadPath);

    if (await fs.pathExists(uploadDir)) {
    } else {
      console.log(`creating directory ${uploadDir}`);
      await fs.ensureDir(uploadDir);
    }

    console.log(`moving tmp file ${file.path} to ${uploadPath}`);
    await fs.move(file.path, uploadPath);
  }
}
