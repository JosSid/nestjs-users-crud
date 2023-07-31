import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { LoggerModule } from 'nestjs-pino';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './correlation-id/correlation-id.middleware';
import { Request } from 'express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              }
            : undefined,
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    }),
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: envSchema,
    }),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoConfig = configService.get('mongo');
        return {
          uri: mongoConfig.uri,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
