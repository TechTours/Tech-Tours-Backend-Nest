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

  @Column({length: 100,nullable:true})
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 30 })
  fullname: string;

  @Column()
  gender : EGender

  @Column({ length: 10 })
  tel: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(()=> Role)
  role : Role

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 32, nullable: true })
  OTP: string;

  @Column({ nullable: false})
  createdAt : Date

  @Column({ nullable: true})
  updatedAt : Date
  
  @Column({nullable:true})
  isVerified:boolean;

  @Column({nullable:true,})
  token:string;

  @Column({nullable:true})
  tokenExpiration:number;

}
