import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infra/shared-infra.module';
import { AggregateRehydrator } from './applications/aggregate-rehydrator';

@Module({
  imports: [SharedInfrastructureModule],
  providers: [AggregateRehydrator],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
})
export class SharedModule {}
