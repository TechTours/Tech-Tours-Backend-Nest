/* eslint-disable prettier/prettier */
import { UserRoles } from 'src/enums/EUserRoles.enum';
import { Entity, PrimaryGeneratedColumn, Column, Unique , ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { EGender } from 'src/enums/EGender.enum';

@Entity('users')
@Unique(['email']) // Ensure that the email column is unique in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 30 })
  fullname: string;

  @Column({ length: 100 })
  gender : EGender

  @Column({ length: 10 })
  tel: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(()=> Role)
  role : UserRoles

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 32, nullable: true })
  OTP: string;

}
