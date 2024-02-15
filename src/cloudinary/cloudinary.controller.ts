import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from './cloudinary.service'

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const data = await this.cloudinaryService.uploadFile(file)
      return {
        statusCode: 200,
        data: {
          url: data.url,
          id: data.public_id,
        },
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      }
    }
  }
}
