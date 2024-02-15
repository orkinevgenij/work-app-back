import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { ResumeService } from './resume.service'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from 'src/utils/multer.config'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Controller('resume')
export class ResumeController {
  constructor(
    private resumeService: ResumeService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @Body() createResumeDto: CreateResumeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.create(createResumeDto, +req.user.id, file)
  }

  @Get('all')
  async findAll() {
    return this.resumeService.findAll()
  }

  @Get('my-resumes')
  @UseGuards(JwtGuard)
  async findMyResumes(@Req() req) {
    return this.resumeService.findMyResumes(+req.user.id)
  }

  @Get(':id')
  async findOneResume(@Param('id') id: string) {
    return this.resumeService.findOneResume(+id)
  }
  @Get('other-resumes/:id')
  async similarResumeUser(@Param('id') id: string) {
    return this.resumeService.otherResumesUser(+id)
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.update(+id, updateResumeDto, file)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    return this.resumeService.remove(+id)
  }
}
