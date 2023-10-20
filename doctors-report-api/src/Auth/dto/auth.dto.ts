import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  doctorsName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsPhoneNumber('NG')
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
