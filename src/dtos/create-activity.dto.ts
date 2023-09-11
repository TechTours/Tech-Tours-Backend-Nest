/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateActivityDto{

  @IsString()
  @IsNotEmpty()
  animal: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  time: Date;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  latitude: string;
  
}