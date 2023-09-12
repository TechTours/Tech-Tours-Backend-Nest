/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString , IsOptional} from "class-validator";

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
    @IsOptional()
    @ApiProperty()
    adminKey : string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isAdmin : boolean;
}