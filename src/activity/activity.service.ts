/* eslint-disable */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from 'src/dtos/create-activity.dto';
import { Activity } from 'src/entities/activity.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UpdateActivityDto } from 'src/dtos/update-activity.dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import {DateTime} from "luxon"

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity) private readonly activityRepository : Repository<Activity>,
        private readonly webSocketGateway: WebsocketGateway
    ){}

    async findAll(){
        return await this.activityRepository.find()
    }

    async findAllValid() {
        const all = await this.activityRepository.find();
        // Filter out activities that are more than 10 minutes old
        const valid = all.filter(activity =>    
          (new Date().getTime() - activity.time.getTime())/(1000*60) <= 10
        );
      
        return valid;
      }


    async findOneById(id : number){
        return await this.activityRepository.findOne({
            where : {
                id : id
            }
        })
    }

    async createActivity(activity : CreateActivityDto){
        const {animal , location , longitude , latitude } = activity;
        if(!animal || !location  || !longitude || !latitude){
            return new BadRequestException("Please fill all the fields");
        }

        const newActivity = new Activity();
        newActivity.animal = animal;
        newActivity.location = location;
        newActivity.time = new Date();
        newActivity.longitude = longitude;
        newActivity.latitude = latitude;

        await this.activityRepository.save(newActivity);
        this.webSocketGateway.sendData(newActivity);

        return {
            message : "Activity created successfully",
            activity : newActivity,
            status : 201
        }



    }

    async deleteActivity(id : number){
        const activity = await this.activityRepository.findOne({
            where : {
                id : id
            }
        })
        if(!activity){
            return new NotFoundException("Activity not found");
        }

        await this.activityRepository.delete(id)

        return {
            message : "Activity deleted successfully",
            data : activity
        }
    }


   async updateActivity(id : number , attrs : Partial<UpdateActivityDto>){
    console.log(id);
    const activity = await this.activityRepository.findOne({
        where : {
            id : id
        }
    })
        if(!activity){
            return new NotFoundException("Activity not found");
        }

        Object.assign(activity , attrs)

        await this.activityRepository.save(activity)

        return {
            message : "Activity updated successfully",
            data : activity
        }
       }

       async  getActivitiesByAnimal(animal : string){
        const activities = await this.activityRepository.find({
            where : {
                animal : animal
            }
        })
        if(!activities){
            return new NotFoundException("Activities not found");
        }

        return activities
       }
}
