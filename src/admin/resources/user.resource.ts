import { ResourceWithOptions } from 'adminjs';
import { client, dmmf } from './config';

export const CreateUserResource = (): ResourceWithOptions => ({
  resource: { model: dmmf.modelMap.User, client },
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
      },
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc',
    },
  },
});
