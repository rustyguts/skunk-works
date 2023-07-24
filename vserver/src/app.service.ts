import * as Path from 'path';
import { Injectable } from '@nestjs/common';

const path = '/mnt/shack/media/gaming/recordings';

@Injectable()
export class AppService {
  getFilepath(url: string): string {
    const fullPath = Path.normalize(Path.join(path, url));
    return fullPath;
  }
}
