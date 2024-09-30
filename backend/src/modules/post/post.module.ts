import { Module } from '@nestjs/common';
import { PostServiceService } from './post-service/post-service.service';
import { PostControllerController } from './post-controller/post-controller.controller';
import { UserService } from '../user/services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../Socket/app.gateway';
import { NotificationService } from '../notification/notification.service';

@Module({
    providers: [PostServiceService, UserService, PrismaService, AppGateway, NotificationService],
    controllers: [PostControllerController]
})
export class PostModuleModule {}
