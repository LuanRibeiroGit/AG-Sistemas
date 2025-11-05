import { Injectable, CanActivate } from '@nestjs/common'

@Injectable()
export class RoleGuard implements CanActivate {}
