/* eslint-disable */
import { Module , forwardRef} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {APP_GUARD} from '@nestjs/core'
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { EmailService } from 'src/email/email.service';

@Module({
  imports:[forwardRef(() => UsersModule),TypeOrmModule.forFeature([User])],
  providers: [AuthService , AuthGuard,EmailService , {
    provide : APP_GUARD,
    useClass : AuthGuard
  }],
  exports : [AuthService],
  
})
export class AuthModule {}
