import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: loginDto){
        const user = await this.authService.validateUser(loginDto.emailorphone, loginDto.password);
        if (user){
            if (user.Ban) {
                return { success: false, message: 'User is banned!', banned: true };
            }
            return {success: true, message: 'login done', token: await this.authService.login(user)}
        }
        return { message: 'Invalid credentials'};
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req){
        return req.user
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() body: { refreshToken: string }) {
        const { refreshToken } = body;
        const tokens = await this.authService.refreshAccessToken(refreshToken);
        console.log('token : ', tokens);
        if (!tokens) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return tokens;
    }
}
