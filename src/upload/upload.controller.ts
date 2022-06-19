import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { writeFile } from 'fs';
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

  // take base64 encoded image and save it to disk
  @Post('/base64')
  async uploadBase64File(
    @Body() { base64, filename }: { base64: string; filename: string },
  ) {
    const buffer = Buffer.from(base64, 'base64');
    const newFilename = this.uploadService.getNewFilename(filename);
    const filePath = `./public/files/${newFilename}`;
    writeFile(filePath, buffer, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return { filename: newFilename };
  }

  // take raw file and save it to disk
  @Post('/raw')
  async uploadRawFile(@Req() req: RequestWithBufferBody) {
    const buffer = req.body;
    const newFilename = this.uploadService.generateFilename(
      req.headers['content-type'],
    );
    const filePath = `./public/files/${newFilename}`;
    writeFile(filePath, buffer, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return { filename: newFilename };
  }
}
