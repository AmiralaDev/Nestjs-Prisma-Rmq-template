import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { PrismaOrmHealthIndicator } from '../../providers/prisma/prisma.health';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { RmqModule } from '../../providers/rmq/rmq.module';
import { RmqHealthIndicator } from '../../providers/rmq/rmq.health';

@Module({
  imports: [TerminusModule, HttpModule, RmqModule],
  controllers: [HealthController],
  providers: [PrismaOrmHealthIndicator, PrismaService, RmqHealthIndicator],
})
export class HealthModule {}
