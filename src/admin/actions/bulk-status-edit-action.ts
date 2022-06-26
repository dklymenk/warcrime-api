import {
  ActionContext,
  ActionRequest,
  ActionResponse,
  Action,
  BulkActionResponse,
} from 'adminjs';
import { ReportBulkStatusEdit } from '../components.bundler';

export const bulkStatusEditAction: Action<BulkActionResponse> = {
  name: 'bulkStatusEdit',
  actionType: 'bulk',
  icon: 'Edit',
  isVisible: true,
  showInDrawer: true,
  isAccessible: ({ currentAdmin }) =>
    currentAdmin && currentAdmin.role === 'admin',
  handler: async (
    request: ActionRequest,
    _response: ActionResponse,
    context: ActionContext,
  ) => {
    const { records, resource, h, translateMessage } = context;
    const { status } = request.payload;

    if (!records || !records.length) {
      throw new Error('no records were selected.');
    }
    if (request.method === 'get') {
      const recordsInJSON = records.map((record) =>
        record.toJSON(context.currentAdmin),
      );
      return {
        records: recordsInJSON,
      };
    }
    if (request.method === 'post') {
      await Promise.all(
        records.map((record) => resource.update(record.id(), { status })),
      );
      return {
        records: records.map((record) => record.toJSON(context.currentAdmin)),
        notice: {
          message: translateMessage('success'),
          type: 'success',
        },
        redirectUrl: h.resourceUrl({
          resourceId: resource._decorated?.id() || resource.id(),
        }),
      };
    }
    throw new Error('method should be either "post" or "get"');
  },
  component: ReportBulkStatusEdit,
};
