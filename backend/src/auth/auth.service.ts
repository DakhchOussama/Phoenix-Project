import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    private readonly jwtSecret: string;
    private readonly refreshSecret: string;

    constructor(
        private readonly userService: UserService,
    ){
        this.jwtSecret = process.env.JWT_SECRET;
        this.refreshSecret = process.env.REFRESH_SECRET;
    }


    async validateUser(emailOrPhone: string, pass: string): Promise<User | null> {
      try {
          let user = await this.userService.findByEmail(emailOrPhone);
  
          if (!user) {
              user = await this.userService.findByPhonenumber(emailOrPhone);
          }
  
          if (user && await bcrypt.compare(pass, user.Password)) {
              return user;
          }
      } catch (error) {
          console.error('Error during user validation:', error);
          throw new Error('User validation failed');
      }
      return null;
  };  


    async login(user: User): Promise<{ accessToken: string; refreshToken: string }>{
        const payload = { userId: user.UserID, email: user.Email};
        const jwtService = new JwtService({
            secret: this.jwtSecret,
            signOptions: { expiresIn: '60m' },
          });
        try {
            const accessToken = jwtService.sign(payload);
            const refreshToken = jwtService.sign(payload, { secret: this.refreshSecret }); // Refresh token expires in 7 days

            return { accessToken, refreshToken };
          } catch (error) {
            console.error('Error signing token:', error);
            throw error;
          }
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const jwtService = new JwtService({
                secret: this.jwtSecret,
                signOptions: { expiresIn: '60m' },
              });
            const decoded = jwtService.verify(refreshToken, { secret: this.refreshSecret });
            const user = await this.userService.findById(decoded.userId);
            if (!user) throw new UnauthorizedException();

            // Generate a new access token
            const newAccessToken = jwtService.sign(
                { userId: user.UserID, email: user.Email },
                { secret: this.jwtSecret, expiresIn: '60m' }
            );
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
    
}
