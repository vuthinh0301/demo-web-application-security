import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: User, description: 'User created' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'User list' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    await this.usersService.login(
      loginUserDto.user_name,
      loginUserDto.password,
    );
  }

  @ApiOperation({ summary: 'Login without SQL injection' })
  @Post('/login-security')
  async loginSecurity(@Body() loginUserDto: LoginUserDto) {
    await this.usersService.loginSecurity(
      loginUserDto.user_name,
      loginUserDto.password,
    );
  }

  @ApiCreatedResponse({ type: User, description: 'user by id' })
  @ApiOperation({ summary: 'find user by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiCreatedResponse({ type: User, description: 'user by id' })
  @ApiOperation({ summary: 'find user by id without sql injection' })
  @Get('/no-sql-injection/:id')
  async findOneSecurity(@Param('id') id: string) {
    return this.usersService.findOneSecurity(id);
  }
}
