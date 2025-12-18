import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configModule } from './dynamic-config-module';
import { AppController } from './app.controller';

const testConnectionString =
  process.env.DATABASE_URL || process.env.MONGODB_URI;
console.log('DEBUG: Connection string is:', testConnectionString);
console.log(
  'DEBUG: Does it start correctly?',
  testConnectionString?.startsWith('mongodb'),
);

@Module({
  imports: [configModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [AppController],
})
export class AppModule {}
