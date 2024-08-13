import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: loginDto){
        console.log('JWT Secret:', process.env.JWT_SECRET); // Debugging line
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (user)
            return this.authService.login(user);
        return { message: 'Invalid credentials'};
    }
}
