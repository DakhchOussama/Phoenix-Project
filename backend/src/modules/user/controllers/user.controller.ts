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
      try {
        const user = await this.userService.CreateUser(userdto.fname, userdto.sname, userdto.email, userdto.phonenumber, new Date(`${userdto.birthday}`), userdto.department, userdto.password);
        if (user){
          const token = this.authService.login(user);
          return {
              success: true,
              message: 'User created successfully',
              token: token
          }
        }
      } catch (error){
        console.log('error : ', error.response.code);
          return {
            success: false,
            message: error.response?.message,
            errorCode: error.response?.code, // Optionally include an error code
          };
      }
    return { success: false, message: 'User creation failed' };
  }
  
}
