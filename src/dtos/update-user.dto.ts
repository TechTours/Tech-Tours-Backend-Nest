/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @ApiProperty()
    username: string;
  
  
    @IsOptional()
    @IsString()a
    @ApiProperty()
    email: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    gender : string;
  
    @IsOptional()
    @IsString()
    @ApiProperty()
    fullName: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    tel: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isAdmin : boolean;
}