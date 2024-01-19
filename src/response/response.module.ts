import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Response } from './entities/response.entity'
import { ResponseController } from './response.controller'
import { ResponseService } from './response.service'

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
