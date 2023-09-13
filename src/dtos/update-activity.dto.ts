/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto{

  @IsString()
  @IsOptional()
  @ApiProperty()
  animal: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  time: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  longitude: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  latitude: string;
  
}