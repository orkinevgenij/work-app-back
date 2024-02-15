import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import * as fs from 'fs'
import { multerOptions } from 'src/utils/multer.config'
// console.log('__dirname:', __dirname)
// console.log('process.cwd()', process.cwd())
@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return {
      message: 'success',
      name: body.name,
      file: file.filename,
    }
  }
  @Delete(':filename')
  // async deleteFile(@Param('filename') filename: string) {
  //   const filePath = `${process.cwd()}/uploads/${filename}/`
  //   if (fs.existsSync(filePath)) {
  //     fs.unlinkSync(filePath)
  //     return { message: 'Файл успешно удален', filename }
  //   } else {
  //     return { message: 'Файл не найден' }
  //   }
  // }
  async deleteFile(@Param('filename') filename: string) {
    const filePath = `${process.cwd()}/uploads/${filename}/`
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return { message: 'Файл успешно удален', filename }
    } else {
      return { message: 'Файл не найден' }
    }
  }
  @Get(':file')
  getFile(@Res() res: Response, @Param('file') filename: string) {
    res.sendFile(`${process.cwd()}/uploads/${filename}`)
  }
}
