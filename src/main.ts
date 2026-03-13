import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './common/configuration/configuration.service';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(ConfigurationService);
  const PORT = config.portConfig ?? 3000;
  await app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });
}

void bootstrap();
