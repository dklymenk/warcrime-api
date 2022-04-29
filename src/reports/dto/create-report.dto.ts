import { ReportStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  description: string;

  @IsUrl()
  photo: string;

  @IsEnum(ReportStatus)
  reportStatus: ReportStatus;

  @IsUUID()
  userId: string;
}
