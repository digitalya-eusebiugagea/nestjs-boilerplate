import type { INestApplication } from '@nestjs/common';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { AppModule } from 'src/app.module';
import logger from 'src/logger';
import { markExecutionStartTimeMiddleware } from 'src/modules/core/infrastructure/middlewares/mark-execution-start-time.middleware';
import validationOptions from 'src/modules/core/infrastructure/pipes/validation-options';
import * as request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(WinstonModule.createLogger({ instance: logger }))
      .compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);

    // -- Api prefix
    app.setGlobalPrefix(configService.get('app.apiPrefix'), {
      exclude: ['/'],
    });

    // -- Versioning -- URI
    app.enableVersioning({
      type: VersioningType.URI,
    });

    // -- Cors setup
    app.enableCors();

    // -- Global middlewares
    app.use(helmet());
    app.use(markExecutionStartTimeMiddleware);

    // -- Global pipes
    app.useGlobalPipes(new ValidationPipe(validationOptions));

    // -- Global interceptors
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer()).get('/api/v1/todos').send().expect(401);
  });
});
