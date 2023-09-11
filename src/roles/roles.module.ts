/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';

@Module({
  providers: [RolesService],
  exports : [RolesService],
  imports: [TypeOrmModule.forFeature([Role])],
})
export class RolesModule {}
