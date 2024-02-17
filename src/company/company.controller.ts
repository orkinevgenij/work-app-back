import { CreateCompanyDto } from './dto/createCompanyDto'
import { Controller, Post, UseGuards, Get } from '@nestjs/common'
import { Body, Req } from '@nestjs/common'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/guard/roles.guard'
import { UserRole } from 'src/auth/role.enum'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { CompanyService } from './company.service'
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    return this.companyService.createCompany(createCompanyDto, +req.user.id)
  }

  @Get('my-companies')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async findMyCompany(@Req() req) {
    return this.companyService.findMyCompany(+req.user.id)
  }
  @Get('all')
  async findAllCompany() {
    return this.companyService.findAllCompany()
  }
}
