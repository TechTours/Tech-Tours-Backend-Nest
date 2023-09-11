/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';
export class UpdateActivityDto{

  @IsString()
  @IsOptional()
  animal: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  time: Date;

  @IsString()
  @IsOptional()
  longitude: string;

  @IsString()
  @IsOptional()
  latitude: string;
  
}