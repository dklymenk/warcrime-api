import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { statSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDriveService } from './google-drive.service';

@Module({
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {
  constructor(private moduleRef: ModuleRef, private prisma: PrismaService) {}
  // async onModuleInit() {
  //   const googleDriveService = this.moduleRef.get(GoogleDriveService);
  //   const prisma = this.prisma;
  //   const reports = await prisma.report.findMany();
  //   for (const report of reports) {
  //     const photo = report.photo;
  //     // if (photo.indexOf('https://drive.google.com/') === 0) {
  //     //   continue;
  //     // }
  //     // const oldUrl = new URL(photo);
  //     // const path = oldUrl.pathname;
  //     // console.log(`Uploading ${photo}`);
  //     // const filepath = './public' + path;
  //     // try {
  //     //   statSync(filepath);
  //     // } catch (e) {
  //     //   console.log(`${filepath} does not exist`);
  //     //   continue;
  //     // }
  //     // try {
  //     //   const fileId = await googleDriveService.uploadFile(filepath);
  //     //   console.log(googleDriveService.getFileUrl(fileId));
  //     //   // console.log(fileId);
  //     //   await prisma.report.update({
  //     //     where: { id: report.id },
  //     //     data: { photo: googleDriveService.getFileUrl(fileId) },
  //     //   });
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }

  //     // if (photo.indexOf('https://drive.google.com/') !== 0) {
  //     //   continue;
  //     // }
  //     // const fileId = googleDriveService.getFileIdFromUrl(photo);
  //     // if (!fileId) {
  //     //   continue;
  //     // }
  //     // const { name } = await googleDriveService.getFileName(fileId);
  //     // if (!name) {
  //     //   continue;
  //     // }
  //     // const url = 'http://192.168.0.105:3000/files/' + name;
  //     // console.log(url);
  //     // await prisma.report.update({
  //     //   where: { id: report.id },
  //     //   data: { photo: url },
  //     // });
  //   }
  // googleDriveService.uploadFile('./test/baguette.jpeg');
  // googleDriveService.getFiles();
  // }
}
