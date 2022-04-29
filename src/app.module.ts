import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
