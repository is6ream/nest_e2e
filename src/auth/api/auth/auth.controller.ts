import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '15m' },
    });
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // Проверка SKIP_PASSWORD_CHECK
    if (process.env.SKIP_PASSWORD_CHECK !== 'true') {
      if (password !== '123') {
        return { message: 'Invalid credentials' };
      }
    }
    const payload = { email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { accessToken };
  }
}
