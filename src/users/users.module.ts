/* eslint-disable */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule , ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports : [TypeOrmModule.forFeature([User]) , RolesModule , AuthModule , JwtModule.registerAsync({
    imports : [ConfigModule],
    global : true,
    useFactory : async (configService : ConfigService) => ({
      secret : configService.get<string>('JWT_SIGN_KEY'),
      signOptions : {expiresIn : '3h'}
    }),
    inject : [ConfigService]
  })],
})
export class UsersModule {}
