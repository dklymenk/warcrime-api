import { DASHBOARD } from './components.bundler';
import { auth } from './auth';
import { Database, Resource } from '@adminjs/prisma';
import AdminJS, { AdminJSOptions } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { CreateReportResource, CreateUserResource } from './resources';
import { INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

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

export const setupAdminJS = async (app: INestApplication): Promise<void> => {
  const expressApp: AbstractHttpAdapter = app.get(HttpAdapterHost).httpAdapter;
  const config = generateAdminJSConfig();
  const adminJS = new AdminJS(config);
  expressApp.use(
    adminJS.options.rootPath,
    AdminJSExpress.buildAuthenticatedRouter(adminJS, auth),
  );
};
