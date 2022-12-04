import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Colocar un prefijo global a todos los endpoints de mi API REST
  app.setGlobalPrefix('api/v2');

  await app.listen(3000);
}
bootstrap();
