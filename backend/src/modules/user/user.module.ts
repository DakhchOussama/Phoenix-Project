import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AppGateway } from '../Socket/app.gateway';

@Module({
    providers: [UserService, PrismaService, AuthService, JwtService, AppGateway],
    controllers: [UserController]
})
export class UserModule{} 