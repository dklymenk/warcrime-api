import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { unlinkSync } from 'fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    // Delete uploaded file on report deletion
    this.$use(async (params, next) => {
      if (params.model === 'Report' && ['delete'].includes(params.action)) {
        const { id } = params.args.where;
        const report = await this.report.findFirst({ where: { id } });
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
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
