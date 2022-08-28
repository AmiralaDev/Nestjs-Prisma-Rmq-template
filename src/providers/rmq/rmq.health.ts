import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
// import { merge, fromEvent, of, Observable, map } from 'rxjs';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class RmqHealthIndicator extends HealthIndicator {
  constructor(private amqpConnection: AmqpConnection) {
    super();
  }

  async pingCheck(healthKey: string): Promise<HealthIndicatorResult> {
    try {
      const rmqConnection = this.amqpConnection.managedConnection.isConnected();
      return this.getStatus(healthKey, rmqConnection);
    } catch (_e) {
      throw new HealthCheckError(healthKey, this.getStatus(healthKey, false));
    }
  }

  // watch(): Observable<boolean> {
  //   return merge(
  //     of(this.check()),
  //     fromEvent(this.amqpConnection.managedConnection, 'close').pipe(
  //       map(() => false),
  //     ),
  //     fromEvent(this.amqpConnection.managedConnection, 'error').pipe(
  //       map(() => false),
  //     ),
  //     fromEvent(this.amqpConnection.managedConnection, 'connect').pipe(
  //       map(() => true),
  //     ),
  //   );
  // }
}
