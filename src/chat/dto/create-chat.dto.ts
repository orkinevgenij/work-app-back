import { IsInt, IsString } from 'class-validator'

export class CreateChatDto {
  @IsString()
  message: string

  @IsString()
  author: string

  @IsInt()
  offerId: number
}
