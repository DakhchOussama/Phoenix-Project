import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    private readonly jwtSecret: string;

    constructor(
        private readonly userService: UserService,
    ){
        this.jwtSecret = process.env.JWT_SECRET;
    }


    async validateUser(email: string, pass: string): Promise<User | null>{
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.Password)){
            return user;
        }
        return null;
    };


    async login(user: User){
        const payload = { sub: user.UserID, email: user.Email};
        const jwtService = new JwtService({
            secret: this.jwtSecret,
            signOptions: { expiresIn: '60m' },
          });
        try {
            return {
              access_token: jwtService.sign(payload),
            };
          } catch (error) {
            console.error('Error signing token:', error);
            throw error;
          }
    }
    
}
