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
import { UpdateUserDto } from './dto/createUserDto'
import { UserService } from './user.service'
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

  @Post('forgot-password')
  async forgotPassword(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.forgotPassword(updateUserDto)
  }

  @Post('change-password')
  @UseGuards(JwtGuard)
  async changePassword(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(+req.user.id, updateUserDto)
  }
}
