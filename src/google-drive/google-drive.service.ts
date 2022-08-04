import { Injectable, OnModuleInit } from '@nestjs/common';
import { createReadStream } from 'fs';
import { google } from 'googleapis';
import { lookup } from 'mime-types';

@Injectable()
export class GoogleDriveService implements OnModuleInit {
  private parentFolderId = process.env.GOOGLE_DRIVE_FOLDER;

  setParentFolderId(parentFolderId: string) {
    this.parentFolderId = parentFolderId;
  }

  async onModuleInit() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './secrets/warcrime-357907-12328295d68f.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
  }

  async uploadFile(filePath: string) {
    if (!this.parentFolderId) {
      throw new Error('No parent folder ID set');
    }

    const filename = filePath.split('/').pop();
    const mimeType = lookup(filePath);
    if (!mimeType) {
      throw new Error('Unable to determine mime type');
    }
    const res = await google.drive('v3').files.create({
      requestBody: {
        name: filename,
        mimeType,
        parents: [this.parentFolderId],
        driveId: '0AF71yLqGnY62Uk9PVA',
      },
      media: {
        mimeType,
        body: createReadStream(filePath),
      },
      supportsAllDrives: true,
    });
    const fileId = res.data.id;
    return fileId;
  }

  getFileUrl(fileId: string) {
    return `https://drive.google.com/uc?id=${fileId}`;
  }

  getFileIdFromUrl(fileUrl: string): string | false {
    return fileUrl.split('/uc?id=')[1] || false;
  }

  async deleteFile(fileId: string) {
    await google.drive('v3').files.delete({
      fileId,
      supportsAllDrives: true,
    });
  }

  async getFileWebContentLink(fileId: string) {
    const res = await google.drive('v3').files.get({
      fileId,
      supportsAllDrives: true,
      fields: 'webContentLink',
    });
    return res.data;
  }

  async getFileName(fileId: string) {
    const res = await google.drive('v3').files.get({
      fileId,
      supportsAllDrives: true,
      fields: 'name',
    });
    return res.data;
  }
}
