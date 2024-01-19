import { IsOptional, IsString } from 'class-validator';
export class CreateCompanyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  user?: number;
}
