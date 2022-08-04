import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { LocalStorageService } from 'src/local-storage/local-storage.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private localStorageService: LocalStorageService,
    private googleDriveService: GoogleDriveService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async archiveUploads() {
    // 1. Find all uploads that are older than 2 months
    // 2. Upload them to Google Drive
    // 3. If successful, delete the upload

    this.logger.log('Archiving uploads');

    const uploads =
      await this.localStorageService.findUploadsOlderThan2Months();

    this.logger.log(`Found ${uploads.length} uploads`);

    for (const upload of uploads) {
      try {
        const fileId = await this.googleDriveService.uploadFile(upload);
        this.logger.log(
          `Uploaded ${upload} to Google Drive with file ID ${fileId}`,
        );
        await this.localStorageService.deleteFile(upload);
        this.logger.log(`Deleted ${upload}`);
      } catch (error) {
        this.logger.error(
          `Error uploading ${upload} to Google Drive: ${error}`,
        );
      }
    }

    this.logger.log('Done archiving uploads');
  }
}
