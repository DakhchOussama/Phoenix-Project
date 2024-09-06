import { Module } from '@nestjs/common';
import { PostServiceService } from './post-service/post-service.service';
import { PostControllerController } from './post-controller/post-controller.controller';
import { UserService } from '../user/services/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    providers: [PostServiceService, UserService, PrismaService],
    controllers: [PostControllerController]
})
export class PostModuleModule {}
