import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/entities/user.entity';
import { UsersService } from './application/users/users.service';
import { UsersController } from './api/users/users.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [MongooseModule, JwtModule], // Реэкспорт JwtModule
})
export class AuthModule {}
