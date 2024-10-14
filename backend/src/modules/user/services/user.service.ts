import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CronService } from 'src/cron/cron.service';


@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  
  async checkUser(email: string, phonenumber: string){
    const checkemail = await this.prisma.user.findUnique({
      where: {
          Email: email
      }
    });

    const checkphonenumber = await this.prisma.user.findUnique({
      where: {
          Phone: phonenumber
      }
    });


    // console.log('check phone : ', checkphonenumber);

    if (checkemail) {
      throw new ConflictException({
        code: 'EMAIL_EXISTS',
        message: 'The email address is already in use.',
      });
    }
    
    if (checkphonenumber) {
      throw new ConflictException({
        code: 'PHONE_NUMBER_EXISTS',
        message: 'The phone number is already in use.',
      });
    }
    
    return true;
}

  async CreateUser(fname: string, sname: string, email: string, phonenumber: string, birthday: Date, department: string, password: string){
    const hashedPassword = await this.hashPassword(password);
    const user = this.prisma.user.create({
      data: {
        Fname: fname,
        Sname: sname,
        Email: email,
        Phone: phonenumber,
        Birthday: birthday,
        Department: department,
        Password: hashedPassword,
        AvatarURL: null,
      },
    });    
    return user;
  }


  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    return bcrypt.hash(password, saltRound);
  }

  async findById(UserID: string): Promise<User | null>{
    return this.prisma.user.findUnique({
      where: { UserID },
    });
  };

  async  findByEmail(Email: string): Promise<User | null>{
    return this.prisma.user.findUnique({
      where: {Email},
    });
  };

  async findUserByUsername(username: string): Promise<User[] | null> {
    const [fname, sname] = username.split(' ');

    if (!fname || !sname) {
        throw new Error('Invalid username format. Please provide both first name and surname.');
    }

    const users = await this.prisma.user.findMany({
        where: {
            Fname: fname,
            Sname: sname,
        },
    });

    return users.length > 0 ? users : null; // Return users if found, otherwise null
}

  async findByPhonenumber(Phone: string): Promise<User | null>{
    return this.prisma.user.findUnique({
      where: {Phone}
    }) 
  }

  async updateUser(userDto: UpdateUserdto, userId: string): Promise<any> {
    try {
      const user = await this.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }
  
      // Prepare the updated data
      const updatedData: any = {
        Fname: userDto.fname || user.Fname,
        Sname: userDto.sname || user.Sname,
        Phone: userDto.phonenumber || user.Phone,
        Department: userDto.department || user.Department,
        AvatarURL: userDto.imageUri || user.AvatarURL,
      };
  
      // Update the user's email only if a new email is provided
      if (userDto.email && userDto.email !== user.Email) {
        updatedData.Email = userDto.email; // Update the email if it's different
      }
  
      // If a new password is provided, you should hash it before saving
      if (userDto.password) {
        updatedData.Password = await this.hashPassword(userDto.password); // Ensure to hash the password
      }
  
      // Update the user in the database
      const updatedUser = await this.prisma.user.update({
        where: { UserID: userId }, // Use the user ID for updating
        data: updatedData,
      });
  
      // Return the updated user data
      return updatedUser;
    } catch (error) {
      throw new Error(`User update failed: ${error.message}`);
    }
  }

  async makeadmin(userId: string) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          UserID: userId,
        },
        data: {
          isAdmin: true,
        },
      });
      return updatedUser; // Return the updated user
    } catch (error) {
      throw new Error(`User update failed: ${error.message}`);
    }
  }

  async banUser(userId: string){
    try {
        const user = await this.prisma.user.update({
          where: {
              UserID: userId
          },
          data: {
              Ban: true,
              BanDate: new Date(),
          }
        });

        return true;
    } catch (error) {
        return false;
    }
  }

  async checkBanStatus(userId: string) {
    try {

        const user = await this.prisma.user.findUnique({
            where: { UserID: userId },
            select: { Ban: true, BanDate: true },
        });

        if (user && user.Ban && user.BanDate) {
          const banEndDate = new Date(user.BanDate);
          banEndDate.setMinutes(banEndDate.getDate() + 15);

            const currentDate = new Date();

            if (currentDate >= banEndDate) {
                await this.prisma.user.update({
                    where: { UserID: userId },
                    data: { Ban: false, BanDate: null },
                });
                return { success: true, message: 'User unbanned after 15 days.' };
            }
        }

        return { success: false, message: 'User is not banned or 15 days have not passed yet.' };
    } catch (error) {
        return { success: false, message: 'An error occurred while checking ban status.' };
    }
}

  async removeUser(userId: string){
    try {
        await this.prisma.user.delete({
          where: {
              UserID: userId
          }
        })

        return true;
    } catch (error) {
        console.error('Error removing user:', error);
        return false;
    }
  }



  // async isUserBanned(userId: string): Promise<boolean> {
  //   const user = await this.prisma.user.findUnique({ where: { UserID: userId } });
  //   return user?.Ban ?? false;
  // }
}
