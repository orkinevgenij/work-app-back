import { IsOptional, IsString } from 'class-validator'
import { Resume } from 'src/resume/entities/resume.entity'
import { User } from 'src/user/entities/user.entity'
import { Vacancy } from 'src/vacancy/entities/vacancy.entity'

export class CreateResponseDto {
  @IsOptional()
  vacancy?: Vacancy
  @IsOptional()
  resume?: Resume
  @IsOptional()
  user?: User

  @IsOptional()
  coverLetter: string
}
