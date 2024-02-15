import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithUserName(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    throw new UnauthorizedException('Не коректні логін чи пароль')
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.email,
      role: user.role,
      sub: {
        name: user.name,
      },
    }
    const { password, ...userData } = user

    return {
      ...userData,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    }
  }

  async refreshToken(user: User) {
    const payload = {
      id: user.id,
      role: user.role,
      username: user.email,
      sub: {
        name: user.name,
      },
    }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
