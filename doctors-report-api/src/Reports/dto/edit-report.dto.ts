import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { HIVStatus, HepatitisStatus, Genotype } from '@prisma/client';

export class EditReportDto {
  @IsOptional()
  @IsString()
  patientName: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  hospitalName: string;

  @IsNumber()
  @IsOptional()
  weightKg: number;

  @IsNumber()
  @IsOptional()
  heightCm: number;

  @IsString()
  @IsOptional()
  bloodGroup: string;

  @IsEnum(Genotype)
  @IsOptional()
  genotype: Genotype;

  @IsString()
  @IsOptional()
  bloodPressure: string;

  @IsEnum(HIVStatus)
  @IsOptional()
  HIV_Status: HIVStatus;

  @IsEnum(HepatitisStatus)
  @IsOptional()
  hepatitis: HepatitisStatus;
}
