import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class HttpLoggingExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const logContext = {
      userId: '123',
    };

    const executionStartTime = (req as any).executionStartTime;
    const diff = process.hrtime(executionStartTime);
    const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

    const httpLog = {
      url: req.url,
      httpMethod: req.method,
      clientIp: req.ip,
      httpStatus: (exception as HttpException).getStatus(),
      responseTime: `${responseTime}ms`,
    };

    this.logger.warn(JSON.stringify(httpLog), JSON.stringify(logContext));

    httpAdapter.reply(
      res,
      (exception as HttpException).getResponse(),
      (exception as HttpException).getStatus(),
    );
  }
}
