/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    gender : string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fullName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    tel: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    adminKey : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    isAdmin : string;
}