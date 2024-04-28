import { NestFactory } from '@nestjs/core';
import { ModerationSvcModule } from './moderation-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(ModerationSvcModule);
  await app.listen(3000);
}
bootstrap();
