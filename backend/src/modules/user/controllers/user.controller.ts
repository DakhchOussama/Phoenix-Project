import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('checkinfo')
  async checkUser(@Body() user: Userdto){
    try{
          const checkdata = await this.userService.checkUser(user.email, user.phonenumber);
          if (checkdata){
              return {
                  success: true,
              }
          }
    } catch (error){
        return {
          success: false,
          message: error.response?.message,
          errorCode: error.response?.code,
        };
    }
  }

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
          return {
            success: false,
            message: error.response?.message,
            errorCode: error.response?.code, // Optionally include an error code
          };
      }
    return { success: false, message: 'User creation failed' };
  }

    // @UseGuards(JwtAuthGuard)
    // @Get('info')
    // async getinfouser(@Body() body){
    //     console.log('Im here');
    // }
  
}
