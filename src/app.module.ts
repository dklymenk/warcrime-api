import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { generateAdminModuleOptions } from './admin';

@Module({
  imports: [
    ConfigModule,
    ReportsModule,
    PrismaModule,
    AdminModule.createAdmin(generateAdminModuleOptions()),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
