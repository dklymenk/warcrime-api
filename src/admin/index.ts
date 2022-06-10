import { Dashboard } from './components.bundler';
import { auth } from './auth';
import { AdminModuleOptions } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { CreateReportResource } from './resources';

AdminJS.registerAdapter({ Database, Resource });

export const generateAdminModuleOptions = (): AdminModuleOptions => ({
  adminJsOptions: {
    rootPath: '/admin',
    branding: {
      companyName: 'Харківська правозахисна група',
    },
    dashboard: {
      component: Dashboard,
    },
    resources: [CreateReportResource()],
  },
  auth,
});
