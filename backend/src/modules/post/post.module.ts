import { Module } from '@nestjs/common';
import { PostServiceService } from './post-service/post-service.service';
import { PostControllerController } from './post-controller/post-controller.controller';

@Module({
    providers: [PostServiceService],
    controllers: [PostControllerController]
})
export class PostModuleModule {}
