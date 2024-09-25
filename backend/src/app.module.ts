import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PostControllerController } from './modules/post/post-controller/post-controller.controller';
import { PostServiceService } from './modules/post/post-service/post-service.service';
import { PostModuleModule } from './modules/post/post.module';
import { AppGateway } from './modules/Socket/app.gateway';

@Module({
  imports: [AuthModule, UserModule, PostModuleModule],
  controllers: [AppController, UserController, PostControllerController],
  providers: [AppService, PrismaService, UserService, AuthService, JwtService, PostServiceService, AppGateway],
})
export class AppModule {}
