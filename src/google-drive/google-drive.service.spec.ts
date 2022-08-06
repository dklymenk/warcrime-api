import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDriveService } from './google-drive.service';

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

    await service.deleteFile(fileId);
  });
});
