import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { writeFileSync } from 'fs';
import { UploadInterceptor } from './upload.interceptor';
import { UploadService } from './upload.service';

interface RequestWithBufferBody extends Omit<Request, 'body'> {
  body: Buffer;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(UploadInterceptor)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }

  // take raw file and save it to disk
  @Post('/raw')
  async uploadRawFile(@Req() req: RequestWithBufferBody) {
    const buffer = req.body;

    if (!req.headers['content-disposition']) {
      throw new BadRequestException('Content-Disposition header is missing');
    }

    const filename = this.uploadService.validateContentDisposition(req.headers);

    const newFilename = this.uploadService.getNewFilename(filename);
    const filePath = `./public/files/${newFilename}`;
    writeFileSync(filePath, buffer);
    return { filename: newFilename };
  }
}
