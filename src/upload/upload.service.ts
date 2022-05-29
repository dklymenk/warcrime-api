import { Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getNewFilename(filename: string): string {
    const name = filename.split('.')[0];
    const extension = extname(filename);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${name}-${randomName}${extension}`;
  }
}
