import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmailService } from 'src/email/email.service'
import { User } from 'src/user/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { FilesService } from 'src/files/files.service'
@Module({
  providers: [UserService, EmailService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        imports: [ConfigModule],
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
