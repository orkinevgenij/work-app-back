import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateResponseDto } from './dto/create-response.dto'
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
    return await this.responseRepo.save(newResponse)
  }

  async findResponseByCompany(id: number) {
    return await this.responseRepo.find({
      where: {
        vacancy: {
          company: {
            id: +id,
          },
        },
      },
      relations: {
        vacancy: {
          company: true,
        },
        resume: true,
      },
    })
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
      select: {
        user: {
          id: true,
        },
      },
    })
  }
}
//  relations: {
//       vacancy: {
//         company: true,
//       },
//       resume: true,
//       user: true,
//     },
