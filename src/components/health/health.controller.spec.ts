import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaOrmHealthIndicator } from '../../providers/prisma/prisma.health';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RmqHealthIndicator } from '../../providers/rmq/rmq.health';
import { RmqModule } from '../../providers/rmq/rmq.module';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule, HttpModule, ConfigModule, RmqModule],
      providers: [PrismaOrmHealthIndicator, PrismaService, RmqHealthIndicator],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
