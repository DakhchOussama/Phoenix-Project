import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}


  async CreateUser(fname: string, sname: string, email: string, phonenumber: string, birthday: Date, department: string, password: string){
        const hashedPassword = await this.hashPassword(password);
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

        if (checkemail) {
          throw new Error('Email already in use');
        }
        
        if (checkphonenumber) {
          throw new ConflictException({
            code: 'PHONE_NUMBER_EXISTS',
            message: 'The phone number is already in use.',
          });
        }
        const user = this.prisma.user.create({
          data: {
              Fname: fname,
              Sname: sname,
              Email: email,
              AvatarURL: 'asdfadsf',
              Phone: phonenumber,
              Birthday: birthday,
              Department: department,
              Password: hashedPassword
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

}
