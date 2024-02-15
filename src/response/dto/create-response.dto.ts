import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Resume } from 'src/resume/entities/resume.entity'
import { User } from 'src/user/entities/user.entity'
import { Vacancy } from 'src/vacancy/entities/vacancy.entity'
enum ResponseStatus {
  SENT = 'Відправлено',
  VIEWED = 'Переглянуто',
  INTERVIEW = 'Співбесіда',
  REFUSAL = 'Відмова',
}
export class CreateResponseDto {
  @IsOptional()
  id?: number

  @IsOptional()
  vacancy?: Vacancy

  @IsOptional()
  resume?: Resume

  @IsOptional()
  user?: User

  @IsEnum(ResponseStatus)
  @IsOptional()
  status: ResponseStatus

  @IsOptional()
  coverLetter: string
}
