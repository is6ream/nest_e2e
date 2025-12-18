import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './dynamic-config-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MongoDB URI is missing');
}
@Module({
  imports: [configModule, MongooseModule.forRoot(mongoUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
