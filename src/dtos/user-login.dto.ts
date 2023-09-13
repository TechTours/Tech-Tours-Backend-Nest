/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class UserLoginDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}