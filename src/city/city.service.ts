import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { City } from './entities/city.entity'
import { cities } from 'data/data'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  async addCities() {
    await this.cityRepository.save(cities)
  }
  async findAll() {
    return await this.cityRepository.find()
  }
}
