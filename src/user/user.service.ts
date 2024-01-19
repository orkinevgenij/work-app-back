import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
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
    return await this.userRepo.update(id, updateUserDto)
  }
}
