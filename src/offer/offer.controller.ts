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
import { CreateOfferDto } from './dto/create-offer.dto'
import { OfferService } from './offer.service'

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  // Отпрвить  кандидату предложение по вакансии
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.createOffer(createOfferDto)
  }

  // Найти все офферы
  @Get()
  findAll() {
    return this.offerService.findAll()
  }

  // Счетчик колличества офферов
  @Get('count')
  @UseGuards(JwtGuard)
  getCountOffer(@Req() req) {
    return this.offerService.countOffer(+req.user.id)
  }

  // Найти офферы по вакансии для конкретного пользователя, через id который передается в token
  @Get('my')
  @UseGuards(JwtGuard)
  findUserOffers(@Req() req) {
    return this.offerService.findUserOffers(+req.user.id)
  }

  @Get('company/:id')
  findOfferByCompany(@Param('id') id: string) {
    return this.offerService.findOfferByCompany(+id)
  }

  // Найти один оффер
  @Get(':id')
  // @UseGuards(JwtGuard)
  findOneOffer(@Param('id') id: string) {
    return this.offerService.findOneOffer(+id)
  }
}
