import { NestFactory } from '@nestjs/core';
import { ModerationSvcModule } from './moderation-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ModerationSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
      queue: 'moderation-svc',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
