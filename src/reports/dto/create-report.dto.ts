import {
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

  @IsUUID()
  userId: string;

  @IsLatLong()
  @IsOptional()
  latLong?: string;
}
