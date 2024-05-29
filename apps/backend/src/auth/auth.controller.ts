import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signUp(@Body() signUpData: SignupInput) {
    this.logger.debug('Signup');
    signUpData.email = signUpData.email.toLowerCase();
    const { accessToken, refreshToken } = await this.authService.createUser(
      signUpData,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
