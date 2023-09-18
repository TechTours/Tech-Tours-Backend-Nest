/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
@Injectable()
@ApiTags('auth')
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}
  async sendVerificationEmail(email: string , password : string | null) {

    try {
      let user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (user) {
        let token = {
          value: await this.generateToken(),
          expiration: new Date().getHours() + 24,
        };
        user['token'] = token.value;
        user['tokenExpiration'] = token.expiration;
       if(password && password != null){
        await this.userRepository.save(user);
        await this.emailService.sendEmail(user.email, user.fullname, token.value , password);
       }else{
        await this.userRepository.save(user);
        await this.emailService.sendEmail(user.email, user.fullname, token.value , null);
       }
      } else {
        throw new NotFoundException('User not found!');
      }
    } catch (error) {
      console.log(error.message)
      return {
        message:error.message,
        status:false,
        data:null
      }
    }
  }

  async generateToken() {
    const randomBytesBuffer = randomBytes(32);

    const token = randomBytesBuffer.toString('hex');

    return token;
  }

  async verifyToken(email, token) {
    let user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      if(user.isVerified){
        return {
          message:"Already verified",
          data:null,
          status:true
        }
      }
      console.log(user.tokenExpiration);
      console.log(new Date().getHours());
      if (token == user.token && user.tokenExpiration > new Date().getHours()) {
        user.isVerified = true;
        await this.userRepository.save(user);
      } else {
        return {
          message: 'Failed! Token expired',
          data: null,
          status:false
        };
      }
    }else{
        return {message:"User Not found!",data:null,status:false}
    }
    return {
      message: 'Email verified successfully',
      data: user,
      status:true
    };
  }

  async resetPassword(email){
    let user = await this.userRepository.find({
      where:{
        email
      }
    });
    if(!user || user){
      return {
        message:"User not found!",
        data:null,
        status:"failed"
      }
    }
    

  }

}
