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
  async sendVerificationEmail(email: string) {
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
        await this.userRepository.save(user);
        await this.emailService.sendEmail(email, user.fullname, token.value);
      } else {
        throw new NotFoundException('User not found!');
      }
    } catch (error) {
      throw new Error(error.message);
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
      if (token == user.token && user.tokenExpiration < new Date().getHours()) {
        user.isVerified = true;
        await this.userRepository.save(user);
      } else {
        return {
          message: 'Failed! Token expired',
          data: null,
        };
      }
    }
    return {
      message: 'Email verified successfully',
      data: user,
    };
  }
}
