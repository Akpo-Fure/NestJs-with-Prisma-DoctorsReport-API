import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { EditProfileDto } from './dto';

@Injectable({})
export class DoctorService {
  constructor(private prisma: PrismaService) {}
  async updateProfile(dto: EditProfileDto, userId: string) {
    const doctor = await this.prisma.doctor.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete doctor.password;
    return { message: 'User updated succesfully', doctor };
  }
}
