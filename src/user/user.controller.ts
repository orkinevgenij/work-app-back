import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/createUserDto'
import { UserService } from './user.service'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Put('profile/edit')
  @UseGuards(JwtGuard)
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(+req.user.id, updateUserDto)
  }
}
