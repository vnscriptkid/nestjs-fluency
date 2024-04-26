import { Module } from '@nestjs/common';
import { Svc1Controller } from './svc1.controller';
import { Svc1Service } from './svc1.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WorkflowsModule,
  ],
  controllers: [Svc1Controller],
  providers: [Svc1Service],
})
export class Svc1Module {}
