import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/createCompanyDto'
import { Company } from './entities/company.entity'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto, id: number) {
    const existCompany = await this.companyRepo.find({
      where: {
        title: createCompanyDto.title,
      },
    })
    if (existCompany.length) {
      throw new BadRequestException('This company already exist')
    }
    const newCompany = {
      title: createCompanyDto.title,
      description: createCompanyDto.description,
      user: { id },
    }
    return await this.companyRepo.save(newCompany)
  }

  async findMyCompany(id: number) {
    return await this.companyRepo.findOne({
      where: {
        user: { id },
      },
      relations: {
        user: true,
      },
    })
  }
  async findAllCompany() {
    return await this.companyRepo.find()
  }
}
