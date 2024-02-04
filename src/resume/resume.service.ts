import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { CreateResumeDto } from './dto/create-resume.dto'
import { UpdateResumeDto } from './dto/update-resume.dto'
import { Repository } from 'typeorm'
import { Resume } from './entities/resume.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepo: Repository<Resume>,
  ) {}

  async create(createResumeDto: CreateResumeDto, id: number) {
    const resume = await this.resumeRepo.find({
      where: {
        user: id,
      },
    })
    if (resume.length) {
      throw new BadRequestException('Resume is already created')
    }
    const newResume = {
      name: createResumeDto.name,
      lastname: createResumeDto.lastname,
      position: createResumeDto.position,
      city: createResumeDto.city,
      phone: createResumeDto.phone,
      email: createResumeDto.email,
      profile: createResumeDto.profile,
      salary: createResumeDto.salary,
      user: id,
    }
    return await this.resumeRepo.save(newResume)
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

  async findMyResume(id: number) {
    return await this.resumeRepo.findOne({
      where: {
        user: id,
      },
    })
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    const resume = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!resume) throw new NotFoundException('Resume not found')

    return await this.resumeRepo.update(id, updateResumeDto)
  }

  async remove(id: number) {
    const vacancy = await this.resumeRepo.findOne({
      where: { id },
    })
    if (!vacancy) throw new NotFoundException('Resume not found')
    return await this.resumeRepo.delete(+id)
  }
}
