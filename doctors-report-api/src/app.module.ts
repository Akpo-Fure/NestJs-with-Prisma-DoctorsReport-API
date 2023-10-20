import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { DoctorModule } from './Doctor/doctor.module';
import { ReportsModule } from './Reports/reports.module';
import { PrismaModule } from './Prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DoctorModule,
    ReportsModule,
    PrismaModule,
  ],
})
export class AppModule {}
