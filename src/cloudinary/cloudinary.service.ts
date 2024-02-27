import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryResponse } from './config/cloudinary-response'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder:
            file.mimetype === 'application/pdf'
              ? 'work-app/resume'
              : 'work-app/avatars',
        },
        (error, result) => {
          if (error) reject(error)
          resolve(result)
        },
      )
      toStream(file.buffer).pipe(upload)
    })
  }
  async deleteFile(publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return result
    } catch (error) {
      throw new Error()
    }
  }
}
