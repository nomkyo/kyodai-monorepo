import { Body, Res, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import type { Request, Response } from 'express';
import { User } from '@/users/models/user.model';

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
}
