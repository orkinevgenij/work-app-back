import { IsInt, IsOptional, IsString } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateChatDto {
  @IsString()
  message: string

  @IsOptional()
  user?: User

  @IsInt()
  responseId: number
}
