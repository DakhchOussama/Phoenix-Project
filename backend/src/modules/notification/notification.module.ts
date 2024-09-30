import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/services/user.service';
import { AuthService } from 'src/auth/auth.service';


@Module({
    providers: [NotificationService, PrismaService, UserService, AuthService],
    controllers: [NotificationController]
})
export class NotificationModule {}