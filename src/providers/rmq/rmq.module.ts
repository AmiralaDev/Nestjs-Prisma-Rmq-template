import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RMQ_URI,
      connectionInitOptions: {
        wait: true,
        reject: true,
      },
      exchanges: [
        {
          name: process.env.RMQ_DEFAULT_EXCHANGE,
          type: 'topic',
        },
      ],
    }),
  ],
  // Module re-exporting technique
  exports: [RabbitMQModule],
})
export class RmqModule {}
