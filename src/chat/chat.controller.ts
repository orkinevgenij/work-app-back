import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createChatDto: CreateChatDto, @Req() req) {
    return this.chatService.createMessage(createChatDto, +req.user.id)
  }

  @Get('messages/:id')
  findAllMessageOffer(@Param('id') id: string) {
    return this.chatService.findAllMessageOffer(+id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id)
  }
}
