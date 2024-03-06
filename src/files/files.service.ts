import { Injectable } from '@nestjs/common'
import * as fs from 'fs'

@Injectable()
export class FilesService {
  async deleteFile(file: string) {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(`Ошибка при удалении файла: ${error}`)
      return false
    }
  }

  async uploadFile(file: Express.Multer.File) {
    return file
  }
}
