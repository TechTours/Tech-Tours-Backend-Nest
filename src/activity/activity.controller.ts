/* eslint-disable */
import { Controller , Get , Post , Patch , Delete , Body , Param  } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { CreateActivityDto } from 'src/dtos/create-activity.dto';
import { UpdateActivityDto } from 'src/dtos/update-activity.dto';

@Controller('activity')
@ApiTags('activity')
export class ActivityController {
    constructor(
        private readonly activityService : ActivityService
    ){}

    @Get('/all')
    async findAll(){
        return await this.activityService.findAll();
    }

    @Get('/all/valid')
    async findAllValid(){
        return await this.activityService.findAllValid();
    }

    @Get('/id/:id')
    async findOneById(@Param('id') id : string){
        const activity =  await this.activityService.findOneById(parseInt(id));
        if(!activity){
            return new NotFoundException("Activity not found");
        }
        return activity;
    }

    @Post('/create')
    @ApiBody({type : CreateActivityDto})
    async createActivity(@Body() activity : CreateActivityDto){
        return await this.activityService.createActivity(activity);
    }

    @Patch('/update/:id')
    @ApiBody({type : UpdateActivityDto})
    async updateActivity(@Param('id') id : number , activity : UpdateActivityDto){
        return await this.activityService.updateActivity(id , activity);
    }

    @Delete('/delete/:id')
    async deleteActivity(@Param('id')id : string){
        return await this.activityService.deleteActivity(parseInt(id));
    }

}
