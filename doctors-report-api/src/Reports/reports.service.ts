import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateReportDto, EditReportDto } from './dto';

@Injectable({})
export class ReportsService {
  constructor(private prisma: PrismaService) {}
  async createReport(dto: CreateReportDto, userId: string) {
    const report = await this.prisma.report.create({
      data: {
        userId,
        ...dto,
      },
    });
    return report;
  }

  async getReports(userId: string) {
    const reports = await this.prisma.report.findMany({
      where: {
        userId,
      },
    });
    return reports;
  }

  async getReportById(userId: string, reportId: string) {
    const report = await this.prisma.report.findFirst({
      where: {
        id: reportId,
      },
    });
    if (!report) throw new NotFoundException({ message: 'Report not dound' });
    if (report.userId !== userId)
      throw new UnauthorizedException({
        message: 'You dont have access to this report',
      });
    return report;
  }

  async updateReport(userId: string, reportId: string, dto: EditReportDto) {
    let report = await this.prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });
    if (!report) throw new NotFoundException({ message: 'Report not found' });
    if (report.userId !== userId)
      throw new UnauthorizedException({
        message: 'Not authorized to update this report',
      });
    report = await this.prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        ...dto,
      },
    });
    return { message: 'Report updated successfully', report };
  }
  async deleteReport(userId, reportId) {
    const report = await this.prisma.report.findFirst({
      where: {
        id: reportId,
      },
    });
    if (!report) throw new NotFoundException({ message: 'Report not found' });
    if (report.userId !== userId)
      throw new UnauthorizedException({
        message: 'Not authorized to delete this report',
      });
    await this.prisma.report.delete({
      where: {
        id: reportId,
      },
    });
    return { message: 'Report deleted successfully' };
  }
}
