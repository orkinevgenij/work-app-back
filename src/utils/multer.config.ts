import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from './file-upload'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
}
