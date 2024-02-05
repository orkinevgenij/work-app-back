import { MailerService } from '@nestjs-modules/mailer'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { EmailService } from './../email/email.service'
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto'
import * as randomstring from 'randomstring'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async findOneWithUserName(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    })
  }

  async findOne(id: number) {
    return await this.userRepo.find({ where: { id: id } })
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    if (existUser) throw new BadRequestException('This email already exist')
    const salt = await bcrypt.genSalt(10)
    const user = await this.userRepo.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, salt),
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      phone: createUserDto.phone,
      role: createUserDto.role,
    })
    const { password, ...userData } = user

    const accessToken = this.jwtService.sign({
      id: user.id,
      username: createUserDto.email,
      role: user.role,
      sub: {
        name: createUserDto.name,
      },
    })
    return { ...userData, accessToken }
  }
  async getProfile(user: User) {
    const profile = await this.userRepo.findOne({ where: { id: user.id } })
    const { password, ...userData } = profile
    return {
      ...userData,
    }
  }
  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    console.log('Ваш новый пароль:', updateUserDto.password)
    console.log({ id, ...updateUserDto })
    const updatedUser = await this.userRepo.preload({
      id,
      ...updateUserDto,
    })
    if (!updatedUser) {
      throw new Error('User not found')
    }
    const result = await this.userRepo.save(updatedUser)
    await result.hashPassword()
    return result
  }
  async forgotPassword(updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: updateUserDto.email },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const temporaryPassword = randomstring.generate(8)
    await this.emailService.sendEmail(temporaryPassword)
    user.password = temporaryPassword

    const updatedUser = await this.userRepo.save(user)
    const { password, ...userData } = updatedUser

    return { ...userData }
  }

  async changePassword(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    })

    if (await bcrypt.compare(updateUserDto.password, user.password)) {
      user.password = updateUserDto.newPassword
      const updatedPassword = await this.userRepo.save(user)
      const { password, ...userData } = updatedPassword
      return { ...userData }
    }
    throw new UnauthorizedException('Password are incorrect!')
  }
}
