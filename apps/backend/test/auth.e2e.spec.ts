import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import nock from 'nock';
import { Schedule } from '../src/schedule/models/schedule.model';
import { SignupInput } from '@/auth/dto/signup.input';
import { PrismaService } from 'nestjs-prisma';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get<PrismaService>(PrismaService);
    jwtService = app.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });
  it('/signup hashes password, creates user, and returns tokens', async () => {
    const body: SignupInput = {
      email: 'email@email.com',
      password: 'password',
      firstname: 'firstname',
      lastname: 'lastname',
    };
    const userId = 'userId';
    const user = {
      id: userId,
    };

    const hashedPassword = 'hashedPassword';

    const createUserData = {
      data: {
        ...body,
        password: hashedPassword,
        role: 'USER',
      },
    };

    const accessToken = 'accessToken';
    const refreshToken = 'refreshToken';

    const expectedResponse = {
      accessToken,
      refreshToken,
    };

    const mockSign = jest.fn();
    const mockCreate = jest.fn();
    const mockHash = jest.spyOn(bcrypt, 'hash');
    mockHash.mockImplementation(() => hashedPassword);
    mockSign.mockReturnValueOnce(accessToken);
    mockSign.mockReturnValueOnce(refreshToken);
    mockCreate.mockResolvedValue(user);
    jwtService.sign = mockSign;
    prisma.user.create = mockCreate;

    // Act
    await request(app.getHttpServer())
      .post(`/signup`)
      .send(body)
      .expect(201)
      .expect(expectedResponse);

    // Assert
    expect(prisma.user.create).toHaveBeenCalledWith(createUserData);
    expect(mockHash).toHaveBeenCalledWith(body.password, expect.any(Number));
    expect(mockSign.mock.calls).toEqual([
      [{ userId: userId }],
      [
        { userId },
        { expiresIn: expect.any(String), secret: expect.any(String) },
      ],
    ]);
  });
});
