import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body);
  }

  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findUserById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name?: string; email?: string }) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
