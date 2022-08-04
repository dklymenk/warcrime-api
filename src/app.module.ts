import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { AdminModule } from '@adminjs/nestjs';
import { generateAdminModuleOptions } from './admin';
import { PrismaService } from './prisma/prisma.service';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { LocalStorageModule } from './local-storage/local-storage.module';

@Module({
  imports: [
    ConfigModule,
    ReportsModule,
    PrismaModule,
    AdminModule.createAdminAsync({
      inject: [PrismaService],
      useFactory: generateAdminModuleOptions,
    }),
    UploadModule,
    GoogleDriveModule,
    ScheduleModule.forRoot(),
    TasksModule,
    LocalStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
