import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from './common/interceptors/excludePassword.interceptor';
import * as cookieParser from 'cookie-parser';

dotenv.config();

function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Story Craft API')
    .setDescription('API documentation for the Story Craft application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
}
export const PORT = process.env.PORT || '3002';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ExcludePasswordInterceptor(reflector));

    app.use(cookieParser());

    // Enable CORS for local and deployed frontends
    const allowedOrigins = [
      'http://localhost:3000',
      'https://story-craft-cbt.vercel.app',
    ];

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS: ${origin}`));
        }
      },
      credentials: true,
    });

    // Enable Swagger
    const swaggerConfig = createSwaggerConfig();
    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('api-docs', app, document);

    const port = PORT;
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 Server is running on http://localhost:${port}/health`);
    console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
  } catch (error) {
    console.error('❌ Error during application startup:', error);
    process.exit(1);
  }
}

bootstrap();
