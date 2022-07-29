import { DASHBOARD } from './components.bundler';
import { auth } from './auth';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS, { AdminJSOptions } from 'adminjs';
import { CreateReportResource, CreateUserResource } from './resources';
import { AdminModuleOptions } from '@adminjs/nestjs';

AdminJS.registerAdapter({ Database, Resource });

const generateAdminJSConfig = (): AdminJSOptions => ({
  rootPath: '/admin',
  branding: {
    companyName: 'Харківська правозахисна група',
  },
  dashboard: {
    component: DASHBOARD,
  },
  resources: [CreateReportResource(), CreateUserResource()],
});

export const generateAdminModuleOptions = (): AdminModuleOptions => ({
  adminJsOptions: generateAdminJSConfig(),
  auth,
});
