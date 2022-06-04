import { ActionContext, ActionRequest, ActionResponse } from 'adminjs';
import { ReportBulkDescriptionEdit } from '../components';

export const bulkDescriptionEditAction = {
  actionType: 'bulk',
  icon: 'View',
  isVisible: true,
  handler: async (
    request: ActionRequest,
    _response: ActionResponse,
    context: ActionContext,
  ) => {
    const { records, resource, h, translateMessage } = context;
    const { description } = request.payload;

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
        records.map((record) => resource.update(record.id(), { description })),
      );
      return {
        records: records.map((record) => record.toJSON(context.currentAdmin)),
        notice: {
          message: translateMessage('successfullyBulkDeleted', resource.id(), {
            count: records.length,
          }),
          type: 'success',
        },
        redirectUrl: h.resourceUrl({
          resourceId: resource._decorated?.id() || resource.id(),
        }),
      };
    }
    throw new Error('method should be either "post" or "get"');
  },
  component: ReportBulkDescriptionEdit,
};
