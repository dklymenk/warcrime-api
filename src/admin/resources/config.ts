import { DMMFClass } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

export const getDmmf = (prisma: PrismaService): DMMFClass =>
  (prisma as any)._baseDmmf;
