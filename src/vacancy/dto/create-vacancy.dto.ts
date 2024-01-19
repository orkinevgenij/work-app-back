import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { City } from 'src/city/entities/city.entity'
import { Company } from 'src/company/entities/company.entity'

export class CreateVacancyDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  salary: number

  @IsOptional()
  company?: Company

  @IsOptional()
  city?: City

  @IsOptional()
  category?: Category
}
