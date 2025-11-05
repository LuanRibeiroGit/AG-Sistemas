import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../../users/schema/users.schema'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(process.env.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) return true

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if (!user) throw new ForbiddenException('User not authenticated')
        
        const userFromDb = await this.userModel.findById(user.sub).lean()
        if (!userFromDb)
        throw new ForbiddenException('User not found in the database')

        const hasRole = requiredRoles.includes(userFromDb.role)

        if (!hasRole)
        throw new ForbiddenException('You do not have permission for this route')

        return true
    }
}
