import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }
}
