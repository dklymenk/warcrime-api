import { Test, TestingModule } from '@nestjs/testing';
import { parse } from 'path';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateFilename', () => {
    it('should return a file name for image mimetype', () => {
      expect(service.generateFilename('image/jpeg')).toContain('.jpeg');
    });

    it('should return a file name for video mimetype', () => {
      expect(service.generateFilename('video/mp4')).toContain('.mp4');
    });

    it('should generate name that is at least 8 characters long', () => {
      const { name } = parse(service.generateFilename('image/jpeg'));
      expect(name.length).toBeGreaterThanOrEqual(8);
    });
  });
});
