import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
