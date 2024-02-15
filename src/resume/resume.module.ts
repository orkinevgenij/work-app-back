import { Module } from '@nestjs/common'
import { ResumeService } from './resume.service'
import { ResumeController } from './resume.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Resume } from './entities/resume.entity'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { ResponseService } from 'src/response/response.service'
@Module({
  imports: [TypeOrmModule.forFeature([Resume, Response])],
  controllers: [ResumeController],
  providers: [ResumeService, CloudinaryService, ResponseService],
})
export class ResumeModule {}
