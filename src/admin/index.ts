import { DASHBOARD } from './components.bundler';
import { auth } from './auth';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { CreateReportResource, CreateUserResource } from './resources';
import { AdminModuleOptions } from '@adminjs/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';

AdminJS.registerAdapter({ Database, Resource });

const generateAdminJSConfig = (prisma: PrismaService): AdminJSOptions => ({
  rootPath: '/admin',
  branding: {
    companyName: 'Харківська правозахисна група',
  },
  dashboard: {
    component: DASHBOARD,
  },
  resources: [CreateReportResource(prisma), CreateUserResource(prisma)],
});

export const generateAdminModuleOptions = (
  prisma: PrismaService,
): AdminModuleOptions => ({
  adminJsOptions: generateAdminJSConfig(prisma),
  auth,
});
