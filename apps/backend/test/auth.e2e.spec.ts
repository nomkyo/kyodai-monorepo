import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { SignupInput } from '@/auth/dto/signup.input';
import { PrismaService } from 'nestjs-prisma';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { setupApp } from '../src/common/configs/setupApp';
import * as crypto from 'node:crypto';
import WebSocket from 'ws';
import axios from 'axios';
import { load } from 'cheerio';
import { AnySoaRecord } from 'node:dns';

const INBUCKET_URL = '127.0.0.1:54324';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = setupApp(moduleFixture.createNestApplication());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  const randomEmail = () => {
    const id = crypto.randomBytes(20).toString('hex');
    return `${id}@email.com`;
  };
  const sendMagicLink = async (email: string) =>
    await request(app.getHttpServer())
      .post(`/auth/magic-link`)
      .send({ email })
      .expect(201);

  const getEmailData = (email: string): Promise<any> =>
    new Promise((resolve) => {
      const inbucketUrl = `ws://${INBUCKET_URL}/api/v1/monitor/messages`;
      const ws = new WebSocket(inbucketUrl);
      ws.on('message', async (event) => {
        const metadata = JSON.parse(event.toString());
        const toAddress: string = metadata['to'][0];
        if (toAddress === `<${email}>`) {
          const emailData = await axios.get(
            `http://${INBUCKET_URL}/serve/mailbox/${metadata['mailbox']}/${metadata['id']}`,
          );
          resolve({ metadata, emailData });
          ws.close();
        }
      });
    });
  it('/auth/magic-link, sends a magic link to the email address', async () => {
    const email = randomEmail();
    const subject = 'Magic Link';

    // Act
    await sendMagicLink(email);

    // Assert
    const { metadata } = await getEmailData(email);
    expect(metadata.subject).toEqual(subject);
    expect(metadata.to[0]).toEqual(`<${email}>`);
  });

  it('/auth/confirm, it verifies the token_hash and sets the cookies', async () => {
    const email = randomEmail();
    await sendMagicLink(email);
    const { emailData } = await getEmailData(email);
    const emailHtml = load(emailData.data.html);
    const emailLink = emailHtml('a').attr('href');
    const authLink = new URL(emailLink);
    const cookieMatch = /sb-127-auth-token=.+/;

    // Act
    const resp = await request(app.getHttpServer()).get(
      `${authLink.pathname}${authLink.search}`,
    );

    // Assert
    expect(resp.headers['set-cookie'][0]).toMatch(cookieMatch);
  });
  it('/auth/me, it returns the user information', async () => {
    const email = randomEmail();
    await sendMagicLink(email);
    const { emailData } = await getEmailData(email);
    const emailHtml = load(emailData['data']['html']);
    const emailLink = emailHtml('a').attr('href');
    const authLink = new URL(emailLink);
    const authResponse = await request(app.getHttpServer()).get(
      `${authLink.pathname}${authLink.search}`,
    );

    // Act
    const meResponse = await request(app.getHttpServer())
      .get('/auth/me')
      .set('cookie', authResponse.headers['set-cookie']);

    // Assert
    expect(meResponse.body.user.email).toEqual(email);
  });
  it('/auth/signout, it returns the user information', async () => {
    const email = randomEmail();
    await sendMagicLink(email);
    const { emailData } = await getEmailData(email);
    const emailHtml = load(emailData['data']['html']);
    const emailLink = emailHtml('a').attr('href');
    const authLink = new URL(emailLink);
    const authResponse = await request(app.getHttpServer()).get(
      `${authLink.pathname}${authLink.search}`,
    );
    const emptyCookie = /^sb-127-auth-token=;/
    const cookieMatch = /sb-127-auth-token=base64+./;
    expect(authResponse.headers['set-cookie'][0]).toMatch(cookieMatch);

    // Act
    const signoutResponse = await request(app.getHttpServer())
      .post('/auth/signout')
      .set('cookie', authResponse.headers['set-cookie']);

    // Assert
    expect(signoutResponse.headers['set-cookie'][0]).toMatch(emptyCookie);
  });
});
