import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const executionStartTime = (req as any).executionStartTime;
    const diff = process.hrtime(executionStartTime);
    const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

    const logContext = {
      userId: '123',
    };

    return next.handle().pipe(
      tap(() => {
        const httpLog = {
          url: req.url,
          httpMethod: req.method,
          clientIp: req.ip,
          httpStatus: res.statusCode,
          responseTime: `${responseTime}ms`,
        };

        this.logger.log(JSON.stringify(httpLog), JSON.stringify(logContext));
      }),
    );
  }
}
