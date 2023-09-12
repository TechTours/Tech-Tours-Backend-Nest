/* eslint-disable */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {APP_GUARD} from '@nestjs/core'

@Module({
  providers: [AuthService , AuthGuard , {
    provide : APP_GUARD,
    useClass : AuthGuard
  }],
  exports : [AuthService],
  
})
export class AuthModule {}
