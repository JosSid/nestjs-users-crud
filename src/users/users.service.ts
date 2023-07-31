import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private users = [];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User not found ${id}`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    this.logger.log('Creating user');
    const id = this.users[this.users.length - 1]?.id;
    id
      ? (createUserDto.id = (parseInt(id) + 1).toString())
      : (createUserDto.id = '1');
    this.users.push(createUserDto);
    const user = this.users[this.users.length - 1];
    return { result: 'SUCCESS', user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    const { name, email, password } = updateUserDto;
    name ? (user.name = name) : user;
    email ? (user.email = email) : user;
    password ? (user.password = password) : user;
    return { result: 'SUCCESS', user };
  }

  async delete(id: string) {
    await this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return { result: 'SUCCESS', userDeleted: id };
  }
}
