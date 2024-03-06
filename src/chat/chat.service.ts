import { Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Chat } from './entities/chat.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
  ) {}
  async createMessage(createChatDto: CreateChatDto, id: number) {
    const newMessage = {
      message: createChatDto.message,
      responseId: createChatDto.responseId,
      user: { id },
    }
    return await this.chatRepo.save(newMessage)
  }

  async findAllMessageOffer(id: number) {
    const messages = await this.chatRepo.find({
      where: {
        responseId: id,
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'ASC',
      },
    })
    return messages
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`
  }

  remove(id: number) {
    return `This action removes a #${id} chat`
  }
}
