import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/Prisma/prisma.service';
import { AuthDto, SigninDto } from 'src/Auth/dto';
import { EditProfileDto } from 'src/Doctor/dto';
import { CreateReportDto } from 'src/Reports/dto';

describe('Doctors Report Test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(2000);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:2000');
  });

  afterAll(async () => {
    await app.close();
  });
  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        doctorsName: 'Okegbe Akpofure',
        email: 'okegbeakpofurekelvin@gmail.com',
        gender: 'Male',
        phoneNumber: '+2348147567515',
        password: '123456',
      };
      it('Should fail if only email provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.email)
          .expectStatus(400);
      });
      it('Should fail if only password provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto.password)
          .expectStatus(400);
      });
      it('Should create user', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Login', () => {
      const dto: SigninDto = {
        email: 'okegbeakpofurekelvin@gmail.com',
        password: '123456',
      };
      it('Should throw error if invalid email', () => {
        dto.password = '123';
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(401);
      });
      it('Should throw error if invalid password', () => {
        dto.email = 'okegbe@gmail.com';
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(401);
      });
      it('Should sigin user', () => {
        dto.email = 'okegbeakpofurekelvin@gmail.com';
        dto.password = '123456';
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('token', 'token');
      });
    });
  });
  describe('Profile', () => {
    describe('Get profile', () => {
      it('Should get user profile', () => {
        return pactum
          .spec()
          .get('/doctors/profile')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200);
      });
      it('Should throw error if no token', () => {
        return pactum
          .spec()
          .get('/doctors/profile')
          .withHeaders({ Authorization: 'Bearer $S{token}' });
      });
    });
    describe('Should update user profile', () => {
      const dto: EditProfileDto = {
        doctorsName: 'Iren Otu',
        email: 'irene@gmail.com',
        specialization: 'Neurosurgeon',
        gender: 'Female',
        phoneNumber: '08147567515',
      };
      it('Should throw error if not logged in', () => {
        return pactum
          .spec()
          .patch('/doctors/profile')
          .withBody(dto.email)
          .expectStatus(401);
      });
      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('/doctors/profile')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200);
      });
    });
  });
  describe('Reports', () => {
    describe('Should create reports', () => {
      const dto: CreateReportDto = {
        patientName: 'Okegbe Akpofure',
        age: 25,
        hospitalName: 'Chevron Hospiatl, Warri',
        weightKg: 91,
        heightCm: 184.2,
        bloodGroup: 'O+',
        genotype: 'AA',
        bloodPressure: '184/60 mmHg',
      };
      it('Should throw error if not logged in', () => {
        return pactum.spec().post('/report').withBody(dto).expectStatus(401);
      });
      it('Should throw an error if only name provided', () => {
        return pactum
          .spec()
          .post('/report')
          .withBody(dto.patientName)
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(400);
      });
      it('Should create user', () => {
        return pactum
          .spec()
          .post('/report')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('It should get reports', () => {
      it('should throw error if not logged in', () => {
        return pactum
          .spec()
          .get('/report')
          .withHeaders({ Authorization: 'Bearer $S{}' })
          .expectStatus(401);
      });
      it('should get reports', () => {
        return pactum
          .spec()
          .get('/report')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(200)
          .inspect()
          .expectJsonLength(1);
      });
    });
  });
});
