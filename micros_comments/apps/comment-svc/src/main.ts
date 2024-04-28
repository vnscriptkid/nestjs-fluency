import { NestFactory } from '@nestjs/core';
import { CommentSvcModule } from './comment-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentSvcModule);
  await app.listen(3000);
}
bootstrap();
