import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Response } from './entities/response.entity'
import { ResponseController } from './response.controller'
import { ResponseService } from './response.service'
import { ResumeService } from 'src/resume/resume.service'
import { Resume } from 'src/resume/entities/resume.entity'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Module({
  imports: [TypeOrmModule.forFeature([Response, Resume])],
  controllers: [ResponseController],
  providers: [ResponseService, ResumeService, CloudinaryService],
})
export class ResponseModule {}
