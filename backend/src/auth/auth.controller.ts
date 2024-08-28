import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: loginDto){
        const user = await this.authService.validateUser(loginDto.emailorphone, loginDto.password);
        if (user)
            return {success: true, message: 'login done', token: await this.authService.login(user)}
        return { message: 'Invalid credentials'};
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
