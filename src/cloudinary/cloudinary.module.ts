import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { CloudinaryController } from './cloudinary.controller'
import { CloudinaryProvider } from './config/cloudinary.provider'

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
