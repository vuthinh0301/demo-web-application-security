import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true })
  @Column()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true })
  @Column()
  password: string;
}
