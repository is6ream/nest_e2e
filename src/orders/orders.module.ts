import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { OrdersService } from './application/orders/orders.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [OrdersService],
})
export class OrdersModule {}
