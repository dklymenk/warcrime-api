import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UploadModule } from 'src/upload/upload.module';
import * as request from 'supertest';

describe('UploadContoller (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UploadModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useStaticAssets(join(__dirname, '..', 'public'), {
      setHeaders: (res) => res.setHeader('Access-Control-Allow-Origin', '*'),
    });
    await app.init();
  });

  it('/upload (POST)', async () => {
    const uploadResponse = await request(app.getHttpServer())
      .post('/upload')
      .attach('file', './test/baguette.jpeg');
    expect(uploadResponse.status).toEqual(201);
    expect(uploadResponse.body.filename).toMatch(
      /^baguette-[a-z0-9]{4,}\.jpeg$/,
    );

    const fileResponse = await request(app.getHttpServer()).get(
      `/files/${uploadResponse.body.filename}`,
    );
    expect(fileResponse.status).toEqual(200);
    expect(fileResponse.body.toString()).toBe(
      readFileSync('./test/baguette.jpeg').toString(),
    );
  });

  it('/upload/base64 (POST)', async () => {
    // send baguette as base64 string
    const uploadResponse = await request(app.getHttpServer())
      .post('/upload/base64')
      .send({
        base64: readFileSync('./test/baguette.jpeg').toString('base64'),
        filename: 'baguette.jpeg',
      });
    expect(uploadResponse.status).toEqual(201);
    expect(uploadResponse.body.filename).toMatch(
      /^baguette-[a-z0-9]{4,}\.jpeg$/,
    );

    const fileResponse = await request(app.getHttpServer()).get(
      `/files/${uploadResponse.body.filename}`,
    );
    expect(fileResponse.status).toEqual(200);
    expect(fileResponse.body.toString()).toBe(
      readFileSync('./test/baguette.jpeg').toString(),
    );
  });
});
