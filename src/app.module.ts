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
import { ConfigModule } from '@nestjs/config';

AdminJS.registerAdapter({ Database, Resource });

const prisma = new PrismaClient();
const dmmf = (prisma as any)._dmmf as DMMFClass;

@Module({
  imports: [
    ConfigModule,
    ReportsModule,
    PrismaModule,
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        branding: {
          companyName: 'Харківська правозахисна група',
        },
        dashboard: {
          component: AdminJS.bundle('./admin/components/dashboard'),
        },
        resources: [
          {
            resource: { model: dmmf.modelMap.Report, client: prisma },
            options: {
              listProperties: [
                'description',
                'photo',
                'status',
                'userId',
                'latLong',
              ],
              properties: {
                photo: {
                  components: {
                    show: AdminJS.bundle(
                      './admin/components/report-photo-show',
                    ),
                    list: AdminJS.bundle(
                      './admin/components/report-photo-list',
                    ),
                  },
                },
              },
            },
          },
        ],
      },
      auth: {
        authenticate: async (email, password) => {
          if (email !== process.env.ADMIN_EMAIL) {
            return null;
          }

          if (password !== process.env.ADMIN_PASSWORD) {
            return null;
          }

          return Promise.resolve({ email });
        },
        cookieName: process.env.ADMIN_COOKIE_NAME,
        cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
