import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { VacancyService } from './vacancy.service'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { UserRole } from 'src/auth/role.enum'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/guard/roles.guard'

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('pagination')
  async findAllWithPagination(@Paginate() query: PaginateQuery) {
    return this.vacancyService.findAllWithPagination(query)
  }

  @Get('all')
  async findAll() {
    return this.vacancyService.findAll()
  }

  @Get('search')
  async searchVacancy(
    @Query('title') title: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.vacancyService.searchVacancy(title, query)
  }
  @Get('average-salary')
  async getAverageAge() {
    return this.vacancyService.findAverageSalary()
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.create(createVacancyDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vacancyService.findOne(+id)
  }

  @Get('category/:id')
  async findByCategoryVacancy(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.vacancyService.findByCategoryVacancy(+id, query)
  }
  @Get('company/:id')
  async findByCompanyVacancyPagination(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.vacancyService.findByCompanyVacancyPagination(+id, query)
  }

  @Get('all/company/:id')
  async findByCompanyVacancy(@Param('id') id: string) {
    return this.vacancyService.findByCompanyVacancy(+id)
  }

  @Get('city/:id')
  async findByCityVacancy(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.vacancyService.findByCityVacancy(+id, query)
  }
  @Get('similar/:cid/:vid')
  async findSimilarVacancy(
    @Param('cid') cid: string,
    @Param('vid') vid: string,
  ) {
    return this.vacancyService.findSimilarVacancy(+cid, +vid)
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async update(
    @Param('id') id: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ) {
    return this.vacancyService.update(+id, updateVacancyDto)
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async remove(@Param('id') id: string) {
    return this.vacancyService.remove(+id)
  }
}
