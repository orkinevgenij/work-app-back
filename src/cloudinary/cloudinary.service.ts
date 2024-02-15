import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CloudinaryResponse } from './config/cloudinary-response'
import { v2 as cloudinary } from 'cloudinary'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    const maxSizeInBytes = 10 * 1024 * 1024

    try {
      if (file.size > maxSizeInBytes) {
        throw new HttpException(
          'Файл дуже великий, максимальний розмір 10MB',
          HttpStatus.BAD_REQUEST,
        )
      }

      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder: 'work-app/avatars' },
            (error, result) => {
              if (error) reject(error)
              resolve(result)
            },
          )
          toStream(file.buffer)
            .pipe(upload)
            .on('finish', () => {})
            .on('error', error => {
              reject(error)
            })
        },
      )
      return result
    } catch (error) {
      throw error
    }
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
