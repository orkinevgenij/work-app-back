import { Controller, Post, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Post()
  create() {
    return this.cityService.create();
  }
  @Get()
  findAll() {
    return this.cityService.findAll();
  }
}
