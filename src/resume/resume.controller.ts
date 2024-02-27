import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { ResumeService } from './resume.service'

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

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
  async updateResume(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.updateResume(+id, updateResumeDto, file)
  }

  @Patch('file/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateResumeWithFile(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.updateResumeWithFile(+id, updateResumeDto, file)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    return this.resumeService.remove(+id)
  }
}
