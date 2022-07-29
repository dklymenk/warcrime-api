import { ResourceWithOptions } from 'adminjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { bulkDescriptionEditAction, bulkNotesEditAction } from '../actions';
import { bulkStatusEditAction } from '../actions/bulk-status-edit-action';
import {
  ReportLatLongList,
  ReportLatLongShow,
  ReportPhotoShow,
  ReportPhotoList,
  // ReportUserList,
} from '../components.bundler';
import { getDmmf } from './config';

export const CreateReportResource = (
  prisma: PrismaService,
): ResourceWithOptions => ({
  resource: { model: getDmmf(prisma).modelMap.Report, client: prisma },
  options: {
    navigation: { name: null },
    listProperties: [
      'createdAt',
      'description',
      'photo',
      'latLong',
      'status',
      'user',
      'notes',
    ],
    editProperties: ['status', 'notes', 'description'],
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
      bulkDescriptionEdit: bulkDescriptionEditAction,
      bulkNotesEdit: bulkNotesEditAction,
      bulkStatusEdit: bulkStatusEditAction,
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
      description: {
        type: 'textarea',
      },
      notes: {
        type: 'textarea',
      },
      user: {
        components: {
          // TODO
          // list: ReportUserList,
        },
      },
    },
  },
});
