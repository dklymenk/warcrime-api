import { ResourceWithOptions } from 'adminjs';
import { bulkDescriptionEditAction, bulkNotesEditAction } from '../actions';
import {
  ReportLatLongList,
  ReportLatLongShow,
  ReportPhotoShow,
  ReportPhotoList,
} from '../components.bundler';
import { client, dmmf } from './config';

export const CreateReportResource = (): ResourceWithOptions => ({
  resource: { model: dmmf.modelMap.Report, client },
  options: {
    navigation: { name: null },
    listProperties: [
      'createdAt',
      'description',
      'photo',
      'latLong',
      'status',
      'userId',
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
});
