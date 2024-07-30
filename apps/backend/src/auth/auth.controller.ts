import { Body, Res, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import type { Request, Response } from 'express';
import { User } from '@/users/models/user.model';
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import {
  createClient,
  EmailOtpType,
  MobileOtpType,
} from '@supabase/supabase-js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signUp(@Body() signUpData: SignupInput, @Res() res: Response) {
    this.logger.debug('Signup');
    signUpData.email = signUpData.email.toLowerCase();
    const { accessToken, refreshToken } =
      await this.authService.createUser(signUpData);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    return res.send();
  }

  @Get('me')
  async me(@Req() request: Request): Promise<User> {
    return await this.authService.getUserFromToken(
      request.cookies['accessToken'],
    );
  }

  @Post('magic-link')
  async magicLink(
    @Body() signUpData: SignupInput,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<any> {
    const supabase = createServerClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      {
        cookies: {
          getAll() {
            console.log('get cookies', req.headers.cookie);
            return parseCookieHeader(req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            console.log('set cookies', cookiesToSet);

            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, {
                  ...options,
                  domain: '127.0.0.1',
                  sameSite: false,
                  httpOnly: true,
                }),
              ),
            );
          },
        },
      },
    );
    const response = await supabase.auth.signInWithOtp({
      email: signUpData.email,
      options: {
        emailRedirectTo: '127.0.0.1:5173',
      },
    });
    this.logger.log(response);
    return res.send(response);
  }
  @Post('signout')
  async signOut(@Res() res: Response, @Req() req: Request): Promise<any> {
    const supabase = createServerClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      {
        cookies: {
          getAll() {
            console.log('get cookies', req.headers.cookie);
            return parseCookieHeader(req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            console.log('set cookies', cookiesToSet);

            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, {
                  ...options,
                  domain: '127.0.0.1',
                  sameSite: false,
                  httpOnly: true,
                }),
              ),
            );
          },
        },
      },
    );
    const response = await supabase.auth.signOut();
    this.logger.log(response);
    return res.send(response);
  }
  @Get('supa-me')
  async supaMe(@Res() res: Response, @Req() req: Request): Promise<any> {
    const supabase = createServerClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      {
        cookies: {
          getAll() {
            console.log('get cookies', req.headers.cookie);
            return parseCookieHeader(req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            console.log('set cookies', cookiesToSet);

            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, {
                  ...options,
                  domain: '127.0.0.1',
                  sameSite: false,
                  httpOnly: true,
                }),
              ),
            );
          },
        },
      },
    );
    const response = await supabase.auth.getUser();
    this.logger.log(response);
    return res.send(response);
  }
  @Get('auth/confirm')
  async confirm(@Res() res: Response, @Req() req: Request): Promise<any> {
    const supabase = createServerClient(
      'http://127.0.0.1:54321',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
      {
        cookies: {
          getAll() {
            console.log('get cookies', req.headers.cookie);
            return parseCookieHeader(req.headers.cookie ?? '');
          },
          setAll(cookiesToSet) {
            console.log('set cookies', cookiesToSet);

            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, {
                  ...options,
                  domain: '127.0.0.1',
                  sameSite: false,
                  httpOnly: true,
                }),
              ),
            );
          },
        },
      },
    );
    this.logger.log('validating hash');
    this.logger.log(req.query.token_hash);
    const response = await supabase.auth.verifyOtp({
      token_hash: req.query.token_hash.toString(),
      type: req.query.type.toString() as EmailOtpType,
    });
    return res.redirect("http://localhost:5173");
  }
}
