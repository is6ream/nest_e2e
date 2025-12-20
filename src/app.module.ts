import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './dynamic-config-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    configModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp_test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
