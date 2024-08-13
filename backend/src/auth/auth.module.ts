import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../modules/user/user.module'
import { UserService } from 'src/modules/user/services/user.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { config } from 'dotenv';
config(); 

@Module({
  imports: [
    JwtModule,
    PassportModule,
    UserModule
  ],
  providers: [AuthService, UserService, PrismaService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
