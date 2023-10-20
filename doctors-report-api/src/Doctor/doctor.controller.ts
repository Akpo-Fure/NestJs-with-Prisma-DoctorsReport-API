import { Controller, Body, Get, Patch, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from '@prisma/client';
import { GetDoctor } from '../Auth/decorator/get-user-decorator';
import { JwtGuard } from '../Auth/guard/index';
import { EditProfileDto } from './dto';

@UseGuards(JwtGuard)
@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Get('profile')
  getProfile(@GetDoctor() doctor: Doctor) {
    return doctor;
  }

  @Patch('profile')
  updateProfile(@Body() dto: EditProfileDto, @GetDoctor('id') userId: string) {
    return this.doctorService.updateProfile(dto, userId);
  }
}
