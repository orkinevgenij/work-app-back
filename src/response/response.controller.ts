import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateResponseDto } from './dto/create-response.dto'
import { ResponseService } from './response.service'
import { UserRole } from 'src/auth/role.enum'
import { RolesGuard } from 'src/guard/roles.guard'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { UpdateResponseDto } from './dto/update-response.dto'
import { Paginate, PaginateQuery } from 'nestjs-paginate'

@Controller('response')
@Roles(UserRole.User)
export class ResponseController {
  constructor(private responseService: ResponseService) {}
  @Get('paginate/my')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.User)
  async findMyResponseWithPaginate(
    @Req() req,
    @Paginate() query: PaginateQuery,
  ) {
    return this.responseService.findMyResponseWithPaginate(+req.user.id, query)
  }
  // @Get('paginate/:id')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(UserRole.Employer)
  // async findResponseByCompany(
  //   @Param('id') id: string,
  //   @Paginate() query: PaginateQuery,
  // ) {
  //   return this.responseService.findResponseByCompany(+id, query)
  // }
  @Get('company/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async findResponseByCompany(@Param('id') id: string) {
    return this.responseService.findResponseByCompany(+id)
  }

  @Get('user')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.User)
  async findUserResponse(@Req() req) {
    return this.responseService.findUserResponse(+req.user.id)
  }

  @Get(':id')
  async findOneResponse(@Param('id') id: string) {
    return this.responseService.findOneResponse(+id)
  }

  @Post()
  @UseGuards(JwtGuard)
  async createResponse(
    @Body() createResponseDto: CreateResponseDto,
    @Req() req,
  ) {
    return this.responseService.createResponse(createResponseDto, +req.user.id)
  }

  @Post('response-status')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async changeResponseStatus(@Body() updateResponseDto: UpdateResponseDto) {
    return this.responseService.changeResponseStatus(updateResponseDto)
  }
}
