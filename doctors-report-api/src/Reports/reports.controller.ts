import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtGuard } from '../Auth/guard/jwt.guard';
import { CreateReportDto, EditReportDto } from './dto';
import { GetDoctor } from '../Auth/decorator/get-user-decorator';

@UseGuards(JwtGuard)
@Controller('report')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  createReport(@Body() dto: CreateReportDto, @GetDoctor('id') userId: string) {
    return this.reportsService.createReport(dto, userId);
  }

  @Get()
  getReports(@GetDoctor('id') userId: string) {
    return this.reportsService.getReports(userId);
  }

  @Get(':id')
  getReportById(
    @GetDoctor('id') userId: string,
    @Param('id') reportId: string,
  ) {
    return this.reportsService.getReportById(userId, reportId);
  }

  @Patch(':id')
  updateReport(
    @GetDoctor('id') userId: string,
    @Param('id') reportId: string,
    @Body() dto: EditReportDto,
  ) {
    return this.reportsService.updateReport(userId, reportId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteReport(@GetDoctor('id') userId: string, @Param('id') reportId: string) {
    return this.reportsService.deleteReport(userId, reportId);
  }
}
