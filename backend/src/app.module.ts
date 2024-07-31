import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
