import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './dynamic-config-module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersnpxService } from './nest/orders/application/ordersnpx/ordersnpx.service';

const testConnectionString =
  process.env.DATABASE_URL || process.env.MONGODB_URI;
console.log('DEBUG: Connection string is:', testConnectionString);
console.log(
  'DEBUG: Does it start correctly?',
  testConnectionString?.startsWith('mongodb'),
);

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [OrdersnpxService],
})
export class AppModule {}
