/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  animal: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // time: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  latitude: string;
  
}