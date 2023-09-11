/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('users')
@Unique(['email']) // Ensure that the email column is unique in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 30 })
  fullName: string;

  @Column({ length: 10 })
  tel: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 32, nullable: true })
  OTP: string;

}
