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

  describe('validateContentDisposition', () => {
    it('should throw an error when Content-Disposition header is missing', () => {
      expect(() =>
        service.validateContentDisposition({}),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Content-Disposition header is missing"`,
      );
    });

    it.each([
      [
        {
          'content-disposition': 'form-data; filename="baguette.jpeg"',
        },
      ],
      [
        {
          'content-disposition': 'attachment; filenam="baguette.jpeg";',
        },
      ],
      [
        {
          'content-disposition': 'attachment; filename="foo"',
        },
      ],
      [
        {
          'content-disposition': 'attachment; filename=""',
        },
      ],
    ])(
      'should throw an error when Content-Disposition header is %i',
      (headers) => {
        expect(() => service.validateContentDisposition(headers)).toThrow();
      },
    );

    it('should return filename when Content-Disposition header is valid', () => {
      const headers = {
        'content-disposition': 'attachment; filename="baguette.jpeg"',
      };
      expect(service.validateContentDisposition(headers)).toBe('baguette.jpeg');
    });
  });
});
