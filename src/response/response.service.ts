import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginateConfig, PaginateQuery, paginate } from 'nestjs-paginate'
import { Repository } from 'typeorm'
import { CreateResponseDto } from './dto/create-response.dto'
import { UpdateResponseDto } from './dto/update-response.dto'
import { Response } from './entities/response.entity'

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepo: Repository<Response>,
  ) {}

  async createResponse(createResponseDto: CreateResponseDto, id: number) {
    const newResponse = {
      vacancy: createResponseDto.vacancy,
      resume: createResponseDto.resume,
      coverLetter: createResponseDto.coverLetter,
      user: { id },
    }
    try {
      return await this.responseRepo.save(newResponse)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ви вже залишили відгук на вакансію')
      }
    }
  }

  async findResponseByCompany(id: number, query: PaginateQuery) {
    const config: PaginateConfig<Response> = {
      relations: { vacancy: { company: true }, resume: true, user: true },
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: {
        vacancy: {
          company: {
            id: +id,
          },
        },
      },
    }
    return paginate(query, this.responseRepo, config)
  }

  async findMyResponse(id: number) {
    return await this.responseRepo.find({
      where: {
        user: { id },
      },
      relations: {
        vacancy: {
          company: true,
        },
        resume: true,
        user: true,
      },
    })
  }
  async findMyResponseWithPaginate(id: number, query: PaginateQuery) {
    const config: PaginateConfig<Response> = {
      relations: {
        vacancy: { company: true },
        resume: true,
        user: true,
      },
      sortableColumns: ['createdAt', 'user'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: ['user.'],
      where: {
        user: { id },
      },
    }
    return paginate(query, this.responseRepo, config)
  }

  async changeResponseStatus(updateResponseDto: UpdateResponseDto) {
    const response = await this.responseRepo.findOne({
      where: { id: updateResponseDto.id },
    })

    if (!response) {
      throw new NotFoundException('Response not found')
    }
    response.status = updateResponseDto.status
    return await this.responseRepo.save(response)
  }
}
