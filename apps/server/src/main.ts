import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as CookieParser from 'cookie-parser'
import { ConfigurationService } from './core/configuration'
import { CorsService } from './core/cors'
import { RequestHelper } from './helpers/request'
import { LoggerService } from './libraries/logger'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configurationService = app.get(ConfigurationService)
  const corsService = app.get(CorsService)
  const loggerService = app.get(LoggerService)
  const logger = loggerService.create({ name: 'App' })

  const port = configurationService.getPort()

  app.use(RequestHelper.handleRawBody)

  // Enable CORS with specific frontend origin
  app.enableCors({
    origin: process.env.SERVER_CLIENT_BASE_URL, // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  })

  app.use(CookieParser())

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.setGlobalPrefix('api')

  await app.listen(port)

  logger.success(`Application started on port ${port}`)
}

bootstrap()