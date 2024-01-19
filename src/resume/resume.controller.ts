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
} from '@nestjs/common'
import { ResumeService } from './resume.service'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createResumeDto: CreateResumeDto, @Req() req) {
    return this.resumeService.create(createResumeDto, +req.user.id)
  }
  @Get('all')
  async findAll() {
    return this.resumeService.findAll()
  }

  @Get('my-resume')
  @UseGuards(JwtGuard)
  async findMyResume(@Req() req) {
    return this.resumeService.findMyResume(+req.user.id)
  }
  @Get(':id')
  async findOneResume(@Param('id') id: string) {
    return this.resumeService.findOneResume(+id)
  }
  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.update(+id, updateResumeDto)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    return this.resumeService.remove(+id)
  }
}
