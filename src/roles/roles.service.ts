/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { UserRoles } from 'src/enums/EUserRoles.enum';
import {NotFoundException} from "@nestjs/common";

@Injectable()
export class RolesService {
    constructor(
     @InjectRepository(Role) private roleRepository: Repository<Role>,
    ){}

    createRoles() {
        const roleArray: Array<UserRoles> = [UserRoles.ADMIN, UserRoles.USER];
        roleArray.forEach((role) => {
          const roleEntity = this.roleRepository.create({
            role_name: UserRoles[role],
          });
          this.roleRepository.save(roleEntity);
        });
      }
    
      async getAllRoles() {
        return await this.roleRepository.find();
      }
    
      async getRoleById(id: number) {
        console.log(id);
        const role = await this.roleRepository.findOne({
          where: {
            id: id,
          },
        });
        if (!role) {
          throw new NotFoundException('Role not found');
        }
        return role;
      }

}
