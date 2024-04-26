import { Module } from '@nestjs/common';
import { Svc1Controller } from './svc1.controller';
import { Svc1Service } from './svc1.service';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [WorkflowsModule],
  controllers: [Svc1Controller],
  providers: [Svc1Service],
})
export class Svc1Module {}
