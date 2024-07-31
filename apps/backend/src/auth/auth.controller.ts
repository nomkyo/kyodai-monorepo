import { Body, Res, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import type { Request, Response } from 'express';
import { getSupabaseClient } from '../common/supabase';
import { EmailOtpType } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('magic-link')
  async magicLink(
    @Body() signUpData: SignupInput,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const supabase = getSupabaseClient(req, res);
    const response = await supabase.auth.signInWithOtp({
      email: signUpData.email,
    });

    if (response.error) {
      this.logger.error('Failed to send magic link', response.error);
      return res.status(response.error.status).json(response.error);
    }
    return res.send(response.data);
  }

  @Get('me')
  async me(@Res() res: Response, @Req() req: Request): Promise<Response> {
    const supabase = getSupabaseClient(req, res)
    const response = await supabase.auth.getUser();
    if (response.error) {
      this.logger.error('Failed to get user', response.error);
      return res.status(response.error.status).json(response.error);
    }
    return res.send(response.data);
  }

  @Post('signout')
  async signOut(@Res() res: Response, @Req() req: Request): Promise<any> {
    const supabase = getSupabaseClient(req, res)
    const response = await supabase.auth.signOut();
    if (response.error) {
      this.logger.error('Failed to sign out', response.error);
      return res.status(response.error.status).json(response.error);
    }
    return res.send(response);
  }

  @Get('confirm')
  async confirm(@Res() res: Response, @Req() req: Request): Promise<any> {
    const supabase = getSupabaseClient(req, res)
    const response = await supabase.auth.verifyOtp({
      token_hash: req.query.token_hash.toString(),
      type: req.query.type.toString() as EmailOtpType,
    });
    if (response.error) {
      this.logger.error('Failed to confirm token_hash', response.error);
      return res.status(response.error.status).json(response.error);
    }
    return res.redirect(process.env.ORIGIN);
  }
}
