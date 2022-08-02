import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'mysql2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectDataSource() private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.save(createUserDto);

    return user;
  }

  findAll() {
    const sql = 'SELECT * FROM USER;';
    return this.usersRepository.query(sql);
  }

  async login(userName: string, password: string) {
    const sql1 = `select * from user where user_name = '${userName}' and password = '${password}'`;
    console.log(sql1);
    const rs = await this.usersRepository.query(sql1);
    console.log(rs);
    if (Array.isArray(rs) && rs.length) {
      console.log('Login succeed');
      return true;
    } else {
      console.log('login fail');
      return false;
    }
  }

  async loginSecurity(userName: string, password: string) {
    const sql = 'select * from user where user_name = ? and password = ?';
    const rs = await this.usersRepository.query(sql, [userName, password]);
    if (Array.isArray(rs) && rs.length) {
      console.log('Login succeed');
      return true;
    } else {
      console.log('login fail');
      return false;
    }
  }

  async findOne(id: string) {
    const sql = 'SELECT * FROM User WHERE id = ' + id;
    return await this.usersRepository.query(sql);
  }

  async findOneSecurity(id: string) {
    // return await this.usersRepository.findOneBy({ id });
    const sql = 'SELECT * FROM User WHERE id = ?';
    return await this.usersRepository.query(sql, [id]);
  }
}
