import { Injectable } from '@nestjs/common';
import { extension } from 'mime-types';

@Injectable()
export class UploadService {
  generateFilename(mime: string): string {
    const extname = extension(mime);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const date = new Date();
    const dateTimeString = date
      .toLocaleString('sv')
      .replace(/:/g, '-')
      .replace(/\s/g, '_');

    return `WC_${dateTimeString}_${randomName}.${extname}`;
  }
}
