import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './dynamic-config-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/api/orders/orders.controller';
import { UsersController } from './auth/api/users/users.controller';
import { OrdersService } from './orders/application/orders/orders.service';
import { UsersService } from './auth/application/users/users.service';
import { OrderSchema } from './orders/entities/order.entity';
import { UserSchema } from './auth/entities/user.entity';
@Module({
  imports: [
    configModule,
    // 1. Загружает переменные
    // MongooseModule.forRootAsync({
    //   // 2. Использует ConfigService
    //   useFactory: (configService: ConfigService) => {
    //     const uri = configService.get('MONGODB_URI') as string;
    //     console.log(`MONGODB_URI: ${uri}`);
    //     return {
    //       uri,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'User', schema: UserSchema },
    ]), 
  ],
  controllers: [AppController, OrdersController, UsersController],
  providers: [AppService, OrdersService, UsersService],
})
export class AppModule {}
