import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserRole } from 'src/auth/role.enum'
import { RolesGuard } from 'src/guard/roles.guard'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/createCompanyDto'
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
