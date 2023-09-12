/* eslint-disable */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('home')
export class HomeController {

    @Get('/')
    getHome(): string {
        return '<h2>Welcome to the Tech Tours API</h2> ';
    }
}
