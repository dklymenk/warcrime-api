import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportsModule } from 'src/reports/reports.module';
import { ReportsService } from 'src/reports/reports.service';
import * as request from 'supertest';

describe('ReportController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReportsModule, PrismaModule],
      providers: [PrismaService, ReportsService],
    }).compile();

    app = moduleFixture.createNestApplication();

    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.report.deleteMany({});

    await app.init();
  });

  it('/reports (post)', () => {
    return request(app.getHttpServer())
      .post('/reports')
      .send({
        id: '94a98919-8391-4679-92d1-e0efad4a98b8',
        description: 'test',
        photo: 'test',
        userId: '94a98919-8391-4679-92d1-e0efad4a98b8',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe('94a98919-8391-4679-92d1-e0efad4a98b8');
        expect(res.body.description).toBe('test');
        expect(res.body.photo).toBe('test');
        expect(res.body.userId).toBe('94a98919-8391-4679-92d1-e0efad4a98b8');
      });
  });
});
