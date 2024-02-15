import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { Not, Repository } from 'typeorm'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { Resume } from './entities/resume.entity'

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepo: Repository<Resume>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createResumeDto: CreateResumeDto,
    id: number,
    file: Express.Multer.File,
  ) {
    const resume = await this.resumeRepo.find({
      where: {
        user: id,
      },
    })
    if (resume.length < 3) {
      const data = await this.cloudinaryService.uploadFile(file)
      const newResume = {
        name: createResumeDto.name,
        lastname: createResumeDto.lastname,
        position: createResumeDto.position,
        city: createResumeDto.city,
        phone: createResumeDto.phone,
        email: createResumeDto.email,
        profile: createResumeDto.profile,
        salary: +createResumeDto.salary,
        age: createResumeDto.age,
        user: id,
        file: {
          url: data?.url,
          public_id: data?.public_id,
        },
      }
      return await this.resumeRepo.save(newResume)
    }
    throw new BadRequestException('Максимум 3 резюме')
  }

  async findAll() {
    return await this.resumeRepo.find()
  }
  async findOneResume(id: number) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    return resume
  }

  async otherResumesUser(id: number) {
    const vacancy = await this.resumeRepo.find({
      where: { id: Not(id) },
    })
    return vacancy
  }
  async findMyResumes(id: number) {
    return await this.resumeRepo.find({
      where: {
        user: id,
      },
    })
  }

  async update(
    id: number,
    updateResumeDto: UpdateResumeDto,
    file: Express.Multer.File,
  ) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')

    if (file) {
      const data = await this.cloudinaryService.uploadFile(file)
      updateResumeDto.file = {
        url: data?.url,
        public_id: data?.public_id,
      }
      await this.cloudinaryService.deleteFile(resume.file.public_id)
    } else {
      updateResumeDto.file = {
        url: resume?.file?.url,
        public_id: resume?.file?.public_id,
      }
    }

    const updatedFields = {
      name: updateResumeDto.name,
      lastname: updateResumeDto.lastname,
      position: updateResumeDto.position,
      city: updateResumeDto.city,
      phone: updateResumeDto.phone,
      email: updateResumeDto.email,
      profile: updateResumeDto.profile,
      salary: +updateResumeDto.salary,
      age: updateResumeDto.age,
      file: updateResumeDto.file,
    }
    return await this.resumeRepo.update(id, updatedFields)
  }

  async remove(id: number) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')
    await this.cloudinaryService.deleteFile(resume.file.public_id)
    return await this.resumeRepo.delete(+id)
  }
}
