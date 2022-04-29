import AdminJS from 'adminjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';

AdminJS.registerAdapter({ Database, Resource });

const prisma = new PrismaClient();
const dmmf = (prisma as any)._dmmf as DMMFClass;

@Module({
  imports: [
    ReportsModule,
    PrismaModule,
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: { model: dmmf.modelMap.Report, client: prisma },
            options: {},
          },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
