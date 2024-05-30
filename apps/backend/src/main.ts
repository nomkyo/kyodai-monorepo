import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestConfig } from './common/configs/config.interface';
import { setupApp } from './common/configs/setupApp';

async function bootstrap() {
  const app = setupApp(await NestFactory.create(AppModule));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
