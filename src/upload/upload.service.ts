import { BadRequestException, Injectable } from '@nestjs/common';
import { extension } from 'mime-types';
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

  generateFilename(mime: string): string {
    const extname = extension(mime);
    const randomName = Array(16)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}.${extname}`;
  }

  validateContentDisposition(headers: Record<any, any>): string {
    if (!headers['content-disposition']) {
      throw new BadRequestException('Content-Disposition header is missing');
    }

    const contentDisposition = headers['content-disposition'];
    const filenameRegex = /^attachment; filename="(.*\..*)"/;
    const isFilenameValid = filenameRegex.test(contentDisposition);

    if (!isFilenameValid) {
      throw new BadRequestException('Content-Disposition header is invalid');
    }

    const [, filename] = contentDisposition.match(filenameRegex);
    if (!filename) {
      throw new BadRequestException('Filename is missing');
    }

    return filename;
  }
}
