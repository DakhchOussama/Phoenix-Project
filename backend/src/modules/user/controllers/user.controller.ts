import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Res } from '@nestjs/common';
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
    if (data.username) {
        const users = await this.userService.findUserByUsername(data.username);

        if (users && users.length > 0) {
            return {
                success: true,
                data: users, // Return all found users
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


  @Post('changetoadmin')
  @UseGuards(JwtAuthGuard)
  async changeUserAdmin(@Request() req, @Body() body, @Res() res) {
    const userId = req.user?.UserID;

    // Check if the authenticated user is valid
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Retrieve the authenticated user's data
    const user = await this.userService.findById(userId);

    // Check if the user is already an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can change user roles' });
    }

    // Call the service method to promote the target user to admin
    try {
      const admin = await this.userService.makeadmin(body.userId);
      if (admin) {
        return res.status(200).json({ message: 'User has been successfully promoted to admin' });
      } else {
        return res.status(400).json({ message: 'Failed to update user' });
      }
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  }

 


    // @UseGuards(JwtAuthGuard)
    // @Get('info')
    // async getinfouser(@Body() body){
    //     console.log('Im here');
    // }
  
}
