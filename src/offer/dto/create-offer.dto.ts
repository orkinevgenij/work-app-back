import { IsString } from 'class-validator'
import { Resume } from 'src/resume/entities/resume.entity'
import { Vacancy } from 'src/vacancy/entities/vacancy.entity'

export class CreateOfferDto {
  @IsString()
  message: string

  @IsString()
  resume: Resume

  @IsString()
  vacancy: Vacancy
}
