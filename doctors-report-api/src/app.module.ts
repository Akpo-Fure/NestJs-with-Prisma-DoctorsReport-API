import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [AuthModule, UserModule, DoctorModule, ReportsModule],
})
export class AppModule {}
