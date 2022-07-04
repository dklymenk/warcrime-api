import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
// import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    try {
      await this.prisma.user.create({ data: { id: createReportDto.userId } });
    } catch (error) {}

    return this.prisma.report.create({
      data: createReportDto,
    });
  }

  // findAll() {
  //   return `This action returns all reports`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} report`;
  // }

  // update(id: number, updateReportDto: UpdateReportDto) {
  //   return `This action updates a #${id} report`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} report`;
  // }
}
