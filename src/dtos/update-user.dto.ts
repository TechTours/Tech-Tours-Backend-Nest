/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    @ApiProperty()
    username: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    password: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    gender : string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    fullName: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    tel: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    adminKey : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    isAdmin : string;
}