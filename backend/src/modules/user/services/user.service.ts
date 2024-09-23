import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  
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

      console.log('up : ', updatedData);
  
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

}
