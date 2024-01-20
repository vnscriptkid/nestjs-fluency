import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infra/shared-infra.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
