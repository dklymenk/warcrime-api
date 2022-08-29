import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { raw } from 'body-parser';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UploadModule } from 'src/upload/upload.module';
import request from 'supertest';

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
    app.use(
      '/upload/raw',
      raw({ limit: '500mb', type: ['video/mp4', 'image/jpeg'] }),
    );
    await app.init();
  });

  it('/upload (POST)', async () => {
    const uploadResponse = await request(app.getHttpServer())
      .post('/upload')
      .attach('file', './test/baguette.jpeg');
    expect(uploadResponse.status).toEqual(201);
    expect(uploadResponse.body.filename).toContain('.jpeg');

    const fileResponse = await request(app.getHttpServer()).get(
      `/files/${uploadResponse.body.filename}`,
    );
    expect(fileResponse.status).toEqual(200);
    expect(fileResponse.body.toString()).toBe(
      readFileSync('./test/baguette.jpeg').toString(),
    );
  });

  describe('/upload/raw (POST)', () => {
    it('should return correct extension for image', async () => {
      // send baguette as raw stream
      const buffer = readFileSync('./test/baguette.jpeg');
      const uploadResponse = await request(app.getHttpServer())
        .post('/upload/raw')
        .set('Content-Type', 'image/jpeg')
        .send(buffer);
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.filename).toContain('.jpeg');

      const fileResponse = await request(app.getHttpServer()).get(
        `/files/${uploadResponse.body.filename}`,
      );
      expect(fileResponse.status).toEqual(200);
      expect(fileResponse.body.toString()).toBe(
        readFileSync('./test/baguette.jpeg').toString(),
      );
    });

    it('should return correct extension for video', async () => {
      // send baguette as raw stream
      const buffer = readFileSync('./test/aBgBrQD_460svav1.mp4');
      const uploadResponse = await request(app.getHttpServer())
        .post('/upload/raw')
        .set('Content-Type', 'video/mp4')
        .send(buffer);
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.filename).toContain('.mp4');

      const fileResponse = await request(app.getHttpServer()).get(
        `/files/${uploadResponse.body.filename}`,
      );
      expect(fileResponse.status).toEqual(200);
      expect(fileResponse.body.toString()).toBe(
        readFileSync('./test/aBgBrQD_460svav1.mp4').toString(),
      );
    });
  });
});
