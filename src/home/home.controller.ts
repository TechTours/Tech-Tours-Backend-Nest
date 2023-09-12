/* eslint-disable */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('/')
@ApiTags('home')
export class HomeController {

    @Public()
    @Get('/')
    getHome(): string {
        return '<h2>Welcome to the Tech Tours API</h2> ';
    }
}
