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
      let avatarResume = null
      let fileResume = null
      if (file.mimetype === 'application/pdf') {
        fileResume = await this.cloudinaryService.uploadFile(file)
      } else if (file.mimetype.startsWith('image/')) {
        avatarResume = await this.cloudinaryService.uploadFile(file)
      } else {
        throw new Error('Unsupported file type')
      }

      const newResume: any = {
        name: createResumeDto.name,
        lastname: createResumeDto.lastname,
        position: createResumeDto.position,
        age: createResumeDto.age,
        user: id,
        avatar: avatarResume
          ? {
              url: avatarResume.url,
              public_id: avatarResume.public_id,
            }
          : null,
        file: fileResume
          ? {
              url: fileResume.url,
              public_id: fileResume.public_id,
            }
          : null,
      }
      if (createResumeDto.city) {
        newResume.city = createResumeDto.city
      }
      if (createResumeDto.phone) {
        newResume.phone = createResumeDto.phone
      }
      if (createResumeDto.email) {
        newResume.email = createResumeDto.email
      }
      if (createResumeDto.profile) {
        newResume.profile = createResumeDto.profile
      }
      if (createResumeDto.salary !== undefined) {
        newResume.salary = +createResumeDto.salary
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

  async updateResume(
    id: number,
    updateResumeDto: UpdateResumeDto,
    file: Express.Multer.File,
  ) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')

    if (file) {
      const avatarResume = await this.cloudinaryService.uploadFile(file)
      updateResumeDto.avatar = {
        url: avatarResume?.url,
        public_id: avatarResume?.public_id,
      }
      await this.cloudinaryService.deleteFile(resume.avatar.public_id)
    } else {
      updateResumeDto.avatar = {
        url: resume?.avatar?.url,
        public_id: resume?.avatar?.public_id,
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
      avatar: updateResumeDto.avatar,
    }
    return await this.resumeRepo.update(id, updatedFields)
  }

  async updateResumeWithFile(
    id: number,
    updateResumeDto: UpdateResumeDto,
    file: Express.Multer.File,
  ) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')

    if (file) {
      const fileResume = await this.cloudinaryService.uploadFile(file)
      updateResumeDto.file = {
        url: fileResume?.url,
        public_id: fileResume?.public_id,
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
      file: updateResumeDto.file,
    }
    return await this.resumeRepo.update(id, updatedFields)
  }

  async remove(id: number) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')
    await this.cloudinaryService.deleteFile(resume.avatar.public_id)
    return await this.resumeRepo.delete(+id)
  }
}
