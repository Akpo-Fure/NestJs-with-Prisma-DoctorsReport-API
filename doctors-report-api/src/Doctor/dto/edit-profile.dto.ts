import { Gender } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';

export class EditProfileDto {
  @IsOptional()
  doctorsName?: string;

  @IsOptional()
  @IsPhoneNumber('NG')
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  specialization?: string;
}
