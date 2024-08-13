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

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, AuthService, JwtService],
})
export class AppModule {}
