import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Order extends mongoose.Document {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  product: string;

  @Prop({ default: new Date() })
  orderDate: Date;

  @Prop({ type: Types.ObjectId, required: true })
  userId: mongoose.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
