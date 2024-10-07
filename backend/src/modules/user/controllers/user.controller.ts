import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
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
          const token = await this.authService.login(user);
          return {
              success: true,
              message: 'User created successfully',
              token: token
          }
        }
      } catch (error){
        console.log('error : ', error);
          return {
            success: false,
            message: error.response?.message,
            errorCode: error.response?.code,
          };
      }
      return { success: false, message: 'User creation failed' };
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Request() req, @Body() user: UpdateUserdto){
      try {
        // console.log('Request:', req);
        const userId = req.user?.UserID;
        if (!userId) {
          throw new Error('User not authenticated');
      }
        const updatedUser = await this.userService.updateUser(user, userId);

        return {
          success: true,
          message: 'User updated successfully',
          data: updatedUser,
        };
      } catch (error){
          return {
            success: false,
            message: error.response?.message,
            errorCode: error.response?.code,
          };
      }
  }

  @Post('getuserdata')
  @UseGuards(JwtAuthGuard)
  async getuserdata(@Body() data) {

      if (data.username){
          const user = await this.userService.findUserByUsername(data.username);

          if (user){
              return {
                success: true,
                data: user,
              };
          } else {
                return {
                  success: false,
                  message: 'User not found',
              };
          }
      } else {
            return {
              success: false,
              message: 'Username is required',
          };
      }

  }

    // @UseGuards(JwtAuthGuard)
    // @Get('info')
    // async getinfouser(@Body() body){
    //     console.log('Im here');
    // }
  
}
