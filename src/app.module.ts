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
import {
  Dashboard,
  ReportPhotoList,
  ReportPhotoShow,
  ReportLatLongList,
  ReportLatLongShow,
} from './admin/components';
import { UploadModule } from './upload/upload.module';
import { bulkDescriptionEditAction } from './admin/actions';

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
          component: Dashboard,
        },
        resources: [
          {
            resource: { model: dmmf.modelMap.Report, client: prisma },
            options: {
              listProperties: [
                'createdAt',
                'description',
                'photo',
                'latLong',
                'status',
                'userId',
              ],
              editProperties: ['status'],
              actions: {
                new: { isAccessible: false },
                delete: {
                  isAccessible: ({ currentAdmin }) =>
                    currentAdmin && currentAdmin.role === 'admin',
                },
                edit: {
                  isAccessible: ({ currentAdmin }) =>
                    currentAdmin && currentAdmin.role === 'admin',
                },
                bulkDelete: {
                  isAccessible: ({ currentAdmin }) =>
                    currentAdmin && currentAdmin.role === 'admin',
                },
                bulkDescriptionEdit: {
                  handler: bulkDescriptionEditAction,
                  isAccessible: ({ currentAdmin }) =>
                    currentAdmin && currentAdmin.role === 'admin',
                },
              },
              sort: {
                sortBy: 'createdAt',
                direction: 'desc',
              },
              properties: {
                photo: {
                  components: {
                    show: ReportPhotoShow,
                    list: ReportPhotoList,
                  },
                },
                latLong: {
                  components: {
                    list: ReportLatLongList,
                    show: ReportLatLongShow,
                  },
                },
              },
            },
          },
        ],
      },
      auth: {
        authenticate: async (email, password) => {
          let adminUsers: { email: string; password: string; role: string }[];

          try {
            adminUsers = JSON.parse(process.env.ADMIN_USERS);
          } catch (error) {
            return null;
          }

          const user = adminUsers.find(
            (u) => u.email === email && u.password === password,
          );

          if (!user) {
            return null;
          }

          return Promise.resolve({ email, role: user.role });
        },
        cookieName: process.env.ADMIN_COOKIE_NAME,
        cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
      },
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
