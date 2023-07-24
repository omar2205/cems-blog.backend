import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors((req, cb) => {
    cb(null, {
      origin: ['http://localhost:3000', process.env.FRONTEND_URL].includes(
        req.header('Origin'),
      ),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
