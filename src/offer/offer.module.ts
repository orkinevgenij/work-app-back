import { Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { OfferController } from './offer.controller'
import { Offer } from './entities/offer.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
