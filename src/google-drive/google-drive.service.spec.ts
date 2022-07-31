import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveService } from './google-drive.service';
import request from 'supertest';
import { readFileSync } from 'fs';

describe('GoogleDriveService', () => {
  let service: GoogleDriveService;

  jest.setTimeout(10000);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleDriveService],
    }).compile();

    service = module.get<GoogleDriveService>(GoogleDriveService);
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should allow to upload and delete files', async () => {
    service.setParentFolderId('1ty36h_OkNdwt_2De6mm7D6XImqpJjv2m');

    const fileId = await service.uploadFile('./test/baguette.jpeg');
    expect(fileId).toBeDefined();

    const fileUrl = service.getFileUrl(fileId);
    expect(fileUrl).toBeDefined();

    const url = new URL(fileUrl);
    const host = url.host;
    const path = url.pathname;
    const search = url.search;
    const fileResponse = await request(host)
      .get(path + search)
      .redirects(2);
    expect(fileResponse.status).toEqual(200);
    expect(fileResponse.body.toString()).toBe(
      readFileSync('./test/baguette.jpeg').toString(),
    );

    await service.deleteFile(fileId);
  });
});
