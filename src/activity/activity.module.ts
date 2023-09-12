/* eslint-disable */
import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/entities/activity.entity';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports : [TypeOrmModule.forFeature([Activity])]
})
export class ActivityModule {}
