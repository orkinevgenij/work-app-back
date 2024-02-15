import {
  IsEmail,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsNotEmpty,
} from 'class-validator'

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
  age: string

  @IsString()
  city: string

  @IsString()
  phone: string

  @IsString()
  profile: string

  @IsObject()
  @IsNotEmpty()
  file: {
    url: string
    public_id: string
  }
}
