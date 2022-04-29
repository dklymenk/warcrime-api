import { ReportStatus } from '@prisma/client';
import {
  IsEnum,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  description: string;

  @IsUrl()
  photo: string;

  @IsEnum(ReportStatus)
  status: ReportStatus;

  @IsUUID()
  userId: string;

  @IsLatLong()
  @IsOptional()
  latlong?: string;
}
