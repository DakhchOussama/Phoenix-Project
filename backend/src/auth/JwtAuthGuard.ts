import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserService } from "src/modules/user/services/user.service";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

    constructor(private jwtService: JwtService, private usersService: UserService){
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token)
            throw new UnauthorizedException('No token provided');
        try{
            const payload = this.jwtService.verify(token ,{ secret: process.env.JWT_SECRET });
            const user = await this.usersService.findById(payload.userId);
            
            if (!user)
                throw new UnauthorizedException('User no longer exists');
            request.user = user;
            return true;
        }catch (error){
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}