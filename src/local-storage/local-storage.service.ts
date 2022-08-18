import { Injectable } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class LocalStorageService {
  getUploadsDir() {
    return './public/files';
  }

  async findUploadsOlderThanOneMonth() {
    const uploadsDir = this.getUploadsDir();
    const files = readdirSync(uploadsDir);
    const uploads = await Promise.all(
      files.map(async (file) => {
        const filePath = `${uploadsDir}/${file}`;
        const stats = statSync(filePath);
        return {
          filePath,
          stats,
        };
      }),
    );
    return uploads
      .filter((upload) => {
        return (
          upload.stats.isFile() &&
          upload.stats.mtime.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 30
        );
      })
      .map((upload) => {
        return upload.filePath;
      });
  }

  async deleteFile(filePath: string) {
    await unlink(filePath);
  }
}
