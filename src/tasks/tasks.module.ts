import { Module } from '@nestjs/common';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';
import { LocalStorageModule } from 'src/local-storage/local-storage.module';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksService],
  imports: [LocalStorageModule, GoogleDriveModule],
})
export class TasksModule {}
