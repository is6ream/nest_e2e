import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth/api/auth/auth.controller';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  exports: [JwtModule], // Реэкспорт JwtModule
})
export class AuthModule {}
