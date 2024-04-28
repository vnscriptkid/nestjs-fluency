import { NestFactory } from '@nestjs/core';
import { NotificationSvcModule } from './notification-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationSvcModule);
  await app.listen(3000);
}
bootstrap();
