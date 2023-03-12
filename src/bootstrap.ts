import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import logger from './logger';
import { markExecutionStartTimeMiddleware } from './modules/core/infrastructure/middlewares/mark-execution-start-time.middleware';
import validationOptions from './modules/core/infrastructure/pipes/validation-options';

async function bootstrap() {
  initializeTransactionalContext();

  // -- App Instantiation
  const app = await NestFactory.create(AppModule, {
    // -- Winston setup
    logger: WinstonModule.createLogger({ instance: logger }),
  });

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

  // -- Swagger
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .addOAuth2(
      {
        type: 'oauth2',
        description:
          'This API uses OAuth 2 with the implicit grant flow. [More info](https://api.example.com/docs/auth)',
        flows: {
          implicit: {
            authorizationUrl: 'https://api.example.com/oauth2/authorize',
            scopes: {
              read_pets: 'read your pets',
              write_pets: 'write your pets',
            },
          },
        },
      },
      'ABC',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}

export default bootstrap;
