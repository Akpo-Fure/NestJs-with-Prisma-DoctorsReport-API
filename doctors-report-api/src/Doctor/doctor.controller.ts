import { Controller } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller()
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
}
