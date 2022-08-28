import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaOrmHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async pingCheck(healthKey: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(healthKey, true);
    } catch (_e) {
      throw new HealthCheckError(healthKey, this.getStatus(healthKey, false));
    }
  }
}
