import { Genotype } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  hospitalName: string;

  @IsNumber()
  @IsNotEmpty()
  weightKg: number;

  @IsNumber()
  @IsNotEmpty()
  heightCm: number;

  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsEnum(Genotype)
  @IsNotEmpty()
  genotype: Genotype;

  @IsString()
  @IsNotEmpty()
  bloodPressure: string;
}
