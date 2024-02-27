import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from 'src/auth/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole>('role', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied')
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Insufficient permissions')
    }
    return true
  }
}
