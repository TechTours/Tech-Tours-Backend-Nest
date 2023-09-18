/* eslint-disable */
import { Module } from '@nestjs/common';
// import {RoleService} from "./role/role.service";
import {OnModuleInit} from "@nestjs/common/interfaces";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import {Activity} from "./entities/activity.entity";
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketGateway } from './websocket/websocket.gateway';

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }), // Import ConfigModule here
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule], // Import ConfigModule here
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [
            User,
            Role,
            Activity
          ],
          synchronize: true,
        }),
        inject: [ConfigService],
      }), RolesModule, UsersModule, ActivityModule, HomeModule, AuthModule 
    ],
    providers: [WebsocketGateway]
  })

export class AppModule implements OnModuleInit {
  constructor(
    private readonly roleService: RolesService,
  ) {}

  async onModuleInit() {
    let roles = await this.roleService.getAllRoles();
    if (!roles || roles.length == 0) {
      this.roleService.createRoles();
    }
  }
}
