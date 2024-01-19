import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNumber, IsString } from 'class-validator'
export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  lastname: string

  @IsEmail()
  email: string

  @IsString()
  phone: string

  @IsString()
  password: string
  
  @IsString()
  confirmPassword: string

  @IsString()
  role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
