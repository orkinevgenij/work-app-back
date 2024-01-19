import { IsEmail, IsString, IsNumber } from 'class-validator'

export class CreateResumeDto {
  @IsString()
  name: string

  @IsString()
  lastname: string

  @IsString()
  position: string

  @IsEmail()
  email: string

  @IsNumber()
  salary: number

  @IsString()
  city: string

  @IsString()
  phone: string

  @IsString()
  profile: string
}
