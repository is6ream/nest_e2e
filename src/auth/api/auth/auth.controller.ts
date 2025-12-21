import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { UsersService } from 'src/auth/application/users/users.service';

@Controller('auth')
export class AuthController {
  private readonly jwtService: JwtService;

  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // Проверка SKIP_PASSWORD_CHECK
    if (process.env.SKIP_PASSWORD_CHECK !== 'true') {
      if (password !== '123') {
        return { message: 'Invalid credentials' };
      }
    }
    const payload = { email, id: user._id };
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
