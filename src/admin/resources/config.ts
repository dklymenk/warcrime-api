import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { unlinkSync } from 'fs';

export const client = new PrismaClient();

// Delete uploaded file on report deletion
client.$use(async (params, next) => {
  if (params.model === 'Report' && ['delete'].includes(params.action)) {
    const { id } = params.args.where;
    const report = await client.report.findFirst({ where: { id } });
    const result = await next(params);
    const filename = report.photo.split('/').pop();
    try {
      unlinkSync(`./public/files/${filename}`);
    } catch (err) {
      console.error(err);
    }
    return result;
  }
  const result = await next(params);
  return result;
});

export const dmmf = (client as any)._dmmf as DMMFClass;
