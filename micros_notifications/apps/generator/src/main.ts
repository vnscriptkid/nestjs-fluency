import { NestFactory } from '@nestjs/core';
import { GeneratorModule } from './generator.module';

async function bootstrap() {
  // This is a cronjob that periodically generates notifications and send to notifications service
  await NestFactory.create(GeneratorModule);
}
bootstrap();
