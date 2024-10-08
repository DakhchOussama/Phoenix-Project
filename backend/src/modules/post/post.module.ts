import { Module } from '@nestjs/common';
import { PostServiceService } from './post-service/post-service.service';
import { PostControllerController } from './post-controller/post-controller.controller';
import { UserService } from '../user/services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../Socket/app.gateway';
import { NotificationService } from '../notification/notification.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [PostServiceService, UserService, PrismaService, AppGateway, NotificationService, JwtService],
    controllers: [PostControllerController]
})
export class PostModuleModule {}
