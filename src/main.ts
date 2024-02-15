import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const staticDirectory = `${process.cwd()}/uploads/`
  app.setGlobalPrefix('api')
  app.enableCors()
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // ),
  app.useStaticAssets(staticDirectory)
  await app.listen(8000)
}
bootstrap()
