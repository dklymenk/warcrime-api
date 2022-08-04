import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';

@Module({
  providers: [LocalStorageService],
  exports: [LocalStorageService],
})
export class LocalStorageModule {}
