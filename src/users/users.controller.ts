/* eslint-disable */
import { Controller ,Param , Post ,Delete, Patch , Body , Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly usersService : UsersService
    ){}

    @Get('/all')
    async findAll(){
        return await this.usersService.findAll()
    }

    @Get('/id/:id')
    async findOne(@Param('id') id : string){
        const user = await this.usersService.findOneById(parseInt(id))
        if(!user){
            return new NotFoundException('User not found')
        }
        return user
    }

    @Get('/email/:email')
    async getUserByEmail(@Param('email') email : string){
        const user = await this.usersService.getUserByEmail(email)
        if(!user){
            return new NotFoundException('User not found')
        }
        return user
    }

    @Get('/tel/:tel')
    async getUserByTelephone(@Param('tel') tel :string){
        const user = await this.usersService.getUserByTel(tel)
        if(!user){
            return new NotFoundException('User not found')
        }
        return user
    }

    @Get('/username/:username')
    async getUserByUsername(@Param('username') username : string){
        const user = await this.usersService.findOneByUsername(username)
        if(!user){
            return new NotFoundException('User not found')
        }
        return user
    }

    @Post('/admin/create')
    @ApiBody({type : CreateUserDto})
    async createAdmin(@Body() admin :CreateUserDto){
        return await this.usersService.createAdmin(admin)
    }

    @Post('/create')
    @ApiBody({type : CreateUserDto})
    async createUser(@Body() user : CreateUserDto){
        return await this.usersService.createUser(user)
    }

    @Patch('/update/:id')
    @ApiBody({type : UpdateUserDto})
    async updateUser(@Param('id') id : string , @Body() user : UpdateUserDto){
        return await this.usersService.updateUser(parseInt(id),user)
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id : string){
        return await this.usersService.deleteUser(parseInt(id))
    }
}