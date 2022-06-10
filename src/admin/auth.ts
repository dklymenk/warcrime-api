import { AdminModuleOptions } from '@adminjs/nestjs';

export const auth: AdminModuleOptions['auth'] = {
  authenticate: async (email: string, password: string) => {
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

    return Promise.resolve(user);
  },
  cookieName: process.env.ADMIN_COOKIE_NAME,
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
};
