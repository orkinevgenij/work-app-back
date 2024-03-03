import { Injectable } from '@nestjs/common'
import { CreateOfferDto } from './dto/create-offer.dto'
import { UpdateOfferDto } from './dto/update-offer.dto'
import { Offer } from './entities/offer.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
  ) {}
  async createOffer(createOfferDto: CreateOfferDto) {
    const newOffer = {
      vacancy: createOfferDto.vacancy,
      resume: createOfferDto.resume,
      message: createOfferDto.message,
    }
    return await this.offerRepo.save(newOffer)
  }

  async findAll() {
    const offer = await this.offerRepo.find({
      relations: {
        resume: true,
        vacancy: true,
      },
    })
    return offer
  }
  async findUserOffers(id: number) {
    const offer = await this.offerRepo.find({
      where: {
        resume: {
          user: id,
        },
      },
      relations: {
        resume: true,
        vacancy: {
          company: true,
        },
      },
    })
    return offer
  }
  async findOfferByCompany(id: number) {
    const offer = await this.offerRepo.find({
      where: {
        vacancy: {
          company: {
            id,
          },
        },
      },
      relations: {
        resume: true,
        vacancy: {
          company: true,
        },
      },
    })
    return offer
  }
  async countOffer(id: number) {
    const count = await this.offerRepo.count({
      where: {
        resume: {
          user: id,
        },
      },
      relations: {
        resume: true,
      },
    })
    return count
  }

  async findOneOffer(id: number) {
    const offer = await this.offerRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        vacancy: {
          company: true,
        },
        resume: true,
      },
    })
    return offer
  }
}
