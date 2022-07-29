import { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { getDmmf } from './config';

export const CreateUserResource = (
  prisma: PrismaService,
): ResourceWithOptions => ({
  resource: { model: getDmmf(prisma).modelMap.User, client: prisma },
  options: {
    navigation: { name: null },
    listProperties: ['id', 'createdAt', 'notes'],
    editProperties: ['notes'],
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
    },
    properties: {
      notes: {
        isTitle: true,
        type: 'textarea',
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
