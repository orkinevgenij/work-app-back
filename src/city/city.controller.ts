import { Controller, Get, Post } from '@nestjs/common'
import { CityService } from './city.service'

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Post()
  addCities() {
    return this.cityService.addCities()
  }
  @Get()
  findAll() {
    return this.cityService.findAll()
  }
}
