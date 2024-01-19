import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateResponseDto } from './dto/create-response.dto'
import { ResponseService } from './response.service'
import { UserRole } from 'src/auth/role.enum'
import { RolesGuard } from 'src/guard/roles.guard'
import { Roles } from 'src/auth/decorators/roles.decorator'

@Controller('response')
export class ResponseController {
  constructor(private responseService: ResponseService) {}
  @Get('my')
  @UseGuards(JwtGuard)
  async findMyResponse(@Req() req) {
    return this.responseService.findMyResponse(+req.user.id)
  }
  @Post()
  @UseGuards(JwtGuard)
  async createResponse(
    @Body() createResponseDto: CreateResponseDto,
    @Req() req,
  ) {
    return this.responseService.createResponse(createResponseDto, +req.user.id)
  }
  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.Employer)
  async findResponseByCompany(@Param('id') id: string) {
    return this.responseService.findResponseByCompany(+id)
  }
}
