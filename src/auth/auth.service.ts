import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
@ApiTags('auth')
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}
  async sendVerificationEmail(email: string) {
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
      user["token"] = token.value;
      user["tokenExpiration"] = token.expiration;
      await this.userRepository.update({ email }, user);
      await this.emailService.sendEmail(email, user.fullname, token.value);
    } else {
      // throw new
    }
  }

  async generateToken() {
    return crypto.randomUUID();
  }

  async verifyToken(email,token){
    let user = await this.userRepository.findOne({
        where:{
            email
        }
    });
    if(user){
     if(token == user.token && user.tokenExpiration < new Date().getHours()){
        user.isVerified = true;
        await this.userRepository.update({email},user);
     }
    }
    return {
        message:"Email verified successfully",
        data:user
    }
  }
}
