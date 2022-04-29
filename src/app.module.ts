import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ReportsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
