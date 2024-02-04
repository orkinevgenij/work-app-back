import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateResponseDto } from './dto/create-response.dto'
import { Response } from './entities/response.entity'
import { UpdateResponseDto } from './dto/update-response.dto'
import {
  FilterOperator,
  PaginateConfig,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate'
enum ResponseStatus {
  UNVIEWED = 'Не переглянуто',
  VIEWED = 'Переглянуто',
  INTERVIEW = 'Співбесіда',
  REFUSAL = 'Відмова',
}
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
    return await this.responseRepo.save(newResponse)
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
    console.log(
      '🚀 ~ ResponseService ~ changeResponseStatus ~ response:',
      response,
    )
    if (!response) {
      throw new NotFoundException('Response not found')
    }
    response.status = updateResponseDto.status
    return await this.responseRepo.save(response)
  }
}
