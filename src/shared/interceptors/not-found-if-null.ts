import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class NotFoundIfNull implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    callHandler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const res = httpContext.getResponse<Response>();
    const statusCode = res.statusCode;
    return callHandler.handle().pipe(
      map((data) => {
        if (
          (!data && statusCode) ||
          (Array.isArray(data) && data.length === 0 && statusCode)
        ) {
          throw new HttpException('Notfound', HttpStatus.NOT_FOUND);
        }
        return data;
      }),
    );
  }
}
