import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateResumeDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  lastname?: string

  @IsOptional()
  @IsString()
  position?: string

  @IsOptional()
  @IsString()
  age?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsString()
  @IsOptional()
  email?: string

  @IsInt()
  @IsOptional()
  salary?: number

  @IsString()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  profile?: string

  @IsObject()
  @IsOptional()
  avatar?: {
    url: string
    public_id: string
  }

  @IsObject()
  @IsOptional()
  file?: {
    url: string
    public_id: string
  }
}
