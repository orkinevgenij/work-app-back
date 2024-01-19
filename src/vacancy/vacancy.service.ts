import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Not, Repository } from 'typeorm'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { Vacancy } from './entities/vacancy.entity'
import { PaginateConfig, PaginateQuery, paginate } from 'nestjs-paginate'

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepo: Repository<Vacancy>,
  ) {}
  async findAllWithPagination(query: PaginateQuery) {
    const config: PaginateConfig<Vacancy> = {
      relations: ['company', 'category', 'city'],
      sortableColumns: ['createdAt', 'salary'],
      defaultSortBy: [['createdAt', 'DESC']],
    }
    return paginate(query, this.vacancyRepo, config)
  }

  async create(createVacancyDto: CreateVacancyDto) {
    const newVacancy = {
      title: createVacancyDto.title,
      city: { id: +createVacancyDto.city },
      salary: +createVacancyDto.salary,
      description: createVacancyDto.description,
      company: { id: +createVacancyDto.company },
      category: { id: +createVacancyDto.category },
    }
    return await this.vacancyRepo.save(newVacancy)
  }

  async findAll() {
    return await this.vacancyRepo.find({
      relations: {
        company: true,
        category: true,
        city: true,
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async searchVacancy(title: string, query: PaginateQuery) {
    const config: PaginateConfig<Vacancy> = {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: {
        title: ILike(`%${title}%`),
      },
    }
    return paginate(query, this.vacancyRepo, config)
  }

  async findOne(id: number) {
    const vacancy = await this.vacancyRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        company: true,
        category: true,
        city: true,
      },
    })
    if (vacancy) {
      vacancy.views += 1
      await this.vacancyRepo.save(vacancy)
    }
    return vacancy
  }
  async findSimilarVacancy(cid: number, vid: number) {
    const vacancy = await this.vacancyRepo.find({
      where: {
        category: {
          id: +cid,
        },
        id: Not(+vid),
      },
      relations: {
        company: true,
        category: true,
        city: true,
      },
    })
    return vacancy
  }
  async findByCategoryVacancy(id: number, query: PaginateQuery) {
    const config: PaginateConfig<Vacancy> = {
      relations: ['company', 'category', 'city'],
      sortableColumns: ['createdAt', 'salary'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: {
        category: {
          id: +id,
        },
      },
    }
    return paginate(query, this.vacancyRepo, config)
  }
  async findByCompanyVacancy(id: number, query: PaginateQuery) {
    const config: PaginateConfig<Vacancy> = {
      relations: ['company', 'category', 'city'],
      sortableColumns: ['createdAt', 'salary'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: {
        company: {
          id: +id,
        },
      },
    }
    return paginate(query, this.vacancyRepo, config)
  }
  async findByCityVacancy(id: number, query: PaginateQuery) {
    const config: PaginateConfig<Vacancy> = {
      relations: ['company', 'category', 'city'],
      sortableColumns: ['createdAt', 'salary'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: {
        city: {
          id: +id,
        },
      },
    }
    return paginate(query, this.vacancyRepo, config)
  }
  async update(id: number, updateVacancyDto: UpdateVacancyDto) {
    const vacancy = await this.vacancyRepo.findOne({
      where: { id },
    })
    if (!vacancy) throw new NotFoundException('Vacancy not found')
    return await this.vacancyRepo.update(+id, updateVacancyDto)
  }

  async remove(id: number) {
    const vacancy = await this.vacancyRepo.findOne({
      where: { id },
    })
    if (!vacancy) throw new NotFoundException('Vacancy not found')
    return await this.vacancyRepo.delete(+id)
  }
  async findAverageSalary() {
    const result = await this.vacancyRepo
      .createQueryBuilder('vacancy')
      .select('AVG(vacancy.salary)', 'averageSalary')
      .getRawOne()
    return result.averageSalary || 0
  }
}
