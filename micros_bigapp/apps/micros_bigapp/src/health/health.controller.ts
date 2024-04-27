import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  TypeOrmHealthIndicator,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly db: TypeOrmHealthIndicator,
    private readonly healthService: HealthCheckService,
  ) {}

  @HealthCheck()
  @Get()
  isHealthy() {
    return this.healthService.check([() => this.db.pingCheck('database')]);
  }
}
