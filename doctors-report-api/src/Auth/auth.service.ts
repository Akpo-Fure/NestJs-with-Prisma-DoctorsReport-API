import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../Prisma/prisma.service';
import { AuthDto, SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon.hash(dto.password);
      const user = await this.prisma.doctor.create({
        data: {
          email: dto.email,
          doctorsName: dto.doctorsName,
          password: hashedPassword,
          gender: dto.gender,
          phoneNumber: dto.phoneNumber,
        },
      });
      return {
        message: 'User signed up successfully',
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException({
            message: 'User already exists',
          });
        }
      }
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.doctor.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    const matchPassword = await argon.verify(user.password, dto.password);
    if (!matchPassword)
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    const token = this.generateToken(user.id);
    return token;
  }

  async generateToken(userId: string): Promise<{ token: string }> {
    const token = await this.jwt.signAsync(
      { userId },
      {
        expiresIn: '1d',
        secret: this.config.get('JWT_SECRET'),
      },
    );
    return { token: token };
  }
}
