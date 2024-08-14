import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: loginDto){
        const user = await this.authService.validateUser(loginDto.emailorphone, loginDto.password);
        if (user)
            return this.authService.login(user);
        return { message: 'Invalid credentials'};
    }
}
