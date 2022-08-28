import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaOrmHealthIndicator } from '../../providers/prisma/prisma.health';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { RmqHealthIndicator } from '../../providers/rmq/rmq.health';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    @Inject(PrismaOrmHealthIndicator)
    private db: PrismaOrmHealthIndicator,
    private config: ConfigService,
    @Inject(RmqHealthIndicator)
    private rmq: RmqHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const port = this.config.get<string>('PORT');
    return this.health.check([
      () => this.http.pingCheck('docs', `http://localhost:${port}/docs`),
      () => this.memory.checkHeap('memory-heap', 300 * 1024 * 1024),
      () => this.db.pingCheck('db-connection'),
      () => this.rmq.pingCheck('rmq-connection'),
    ]);
  }
}
