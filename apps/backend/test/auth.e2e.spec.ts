import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { SignupInput } from '@/auth/dto/signup.input';
import { PrismaService } from 'nestjs-prisma';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { setupApp } from '../src/common/configs/setupApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = setupApp(moduleFixture.createNestApplication());
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

    const expectedCookies = [
      `accessToken=${accessToken}; Path=/; HttpOnly`,
      `refreshToken=${refreshToken}; Path=/; HttpOnly`,
    ];

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
    const resp = await request(app.getHttpServer())
      .post(`/signup`)
      .send(body)
      .expect(201)
      .expect({});

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
    expect(resp.headers['set-cookie']).toEqual(expectedCookies);
  });

  it('/me calls prisma with the decoded userId and returns the user', async () => {
    const userId = 'userId';
    const encodedJwtWithUserId =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjE3MTcxMTIxODcsImV4cCI6MTcxNzExMjMwN30.nTuzAumYO3AJqp9QgcMbxxPkgK0ecAoRfttog6JCW0w';

    const user = { id: userId };

    const expectedFindParams = { where: { id: userId } };
    const mockFindUnique = jest.fn();
    prisma.user.findUnique = mockFindUnique;
    mockFindUnique.mockResolvedValue(user);

    // Act
    await request(app.getHttpServer())
      .get(`/me`)
      .set('Cookie', `accessToken=${encodedJwtWithUserId}`)
      .expect(200)
      .expect(user);

    // Assert
    expect(prisma.user.findUnique).toHaveBeenCalledWith(expectedFindParams);
  });
});
