import { SetMetadata } from '@nestjs/common'
import { UserRole } from '../role.enum'

export const Roles = (role: UserRole) => SetMetadata('role', role)
