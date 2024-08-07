import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [CalcModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}