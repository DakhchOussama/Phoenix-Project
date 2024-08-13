import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('create')
  async createUser(@Body() userdto: Userdto){
      const user = await this.userService.CreateUser(userdto.fname, userdto.sname, userdto.email, userdto.phonenumber, new Date(`${userdto.birthday}`), userdto.department, userdto.password);
      if (user){
        return this.authService.login(user);
      }
          // return this.authService.login(user);
      return { message: 'Invalid credentials'};
  }
}
