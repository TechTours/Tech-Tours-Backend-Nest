/* eslint-disable */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EGender } from 'src/enums/EGender.enum';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
    private jwtService: JwtService,
    private authService:AuthService 
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findAllAdmins(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        isAdmin: true,
      },
    });
  }

  async findAllNonAdmins(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        isAdmin: false,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async getUserByTel(tel: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        tel: tel,
      },
    });
  }

  @Public()
  async createAdmin(user: CreateUserDto): Promise<
    | {
        message: string;
        user: User;
      }
    | BadRequestException
  > {
    const {
      username,
      fullName,
      password,
      gender,
      email,
      tel,
      adminKey,
      isAdmin,
    } = user;
    if (isAdmin == false) {
      return new BadRequestException('Bad Request');
    }

    if (adminKey != process.env.TECH_TOURS_ADMIN_KEY) {
      return new BadRequestException('Invalid Admin Key');
    }

    if (gender != 'male' && gender != 'female') {
      return new BadRequestException('Invalid Gender');
    }

    const userEmail = await this.getUserByEmail(email);
    if (userEmail) return new BadRequestException('Email Already Exists');

    const userTel = await this.getUserByTel(tel);
    if (userTel) return new BadRequestException('Tel Already Exists');

    const usernameUser = await this.findOneByUsername(username);
    if (usernameUser) return new BadRequestException('Username Already Exists');

    let adminGender;

    if (gender == 'male') {
      adminGender = EGender.MALE;
    } else {
      adminGender = EGender.FEMALE;
    }

    const role = await this.roleService.getRoleById(1);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = new User();
    userEntity.username = username;
    userEntity.fullname = fullName;
    userEntity.password = hashedPassword;
    userEntity.email = email;
    userEntity.tel = tel;
    userEntity.gender = adminGender;
    userEntity.isAdmin = isAdmin;
    userEntity.role = role;
    userEntity.isActive = true;
    userEntity.createdAt = new Date();
    userEntity.updatedAt = null;
    userEntity.OTP = null;

    await this.userRepository.save(userEntity);
    await this.authService.sendVerificationEmail(userEntity.email);
    return {
      message: 'The Admin Has Been Created Successfully',
      user: userEntity,
    };
  }

  async createUser(user: CreateUserDto): Promise<
    | {
        message: string;
        user: User;
      }
    | BadRequestException
  > {
    const { username, fullName, password, gender, email, tel, isAdmin } = user;
    if (isAdmin == true) {
      return new BadRequestException('Bad Request');
    }

    if (gender != 'male' && gender != 'female') {
      return new BadRequestException('Invalid Gender');
    }

    const userEmail = await this.getUserByEmail(email);
    if (userEmail) return new BadRequestException('Email Already Exists');

    const userTel = await this.getUserByTel(tel);
    if (userTel) return new BadRequestException('Tel Already Exists');

    const usernameUser = await this.findOneByUsername(username);
    if (usernameUser) return new BadRequestException('Username Already Exists');

    let userGender;

    if (gender == 'male') {
      userGender = EGender.MALE;
    } else {
      userGender = EGender.FEMALE;
    }

    const role = await this.roleService.getRoleById(2);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = new User();
    userEntity.username = username;
    userEntity.fullname = fullName;
    userEntity.password = hashedPassword;
    userEntity.email = email;
    userEntity.tel = tel;
    userEntity.gender = userGender;
    userEntity.isAdmin = isAdmin;
    userEntity.role = role;
    userEntity.isActive = true;
    userEntity.createdAt = new Date();
    userEntity.updatedAt = null;
    userEntity.OTP = null;

    await this.userRepository.save(userEntity);
    await this.authService.sendVerificationEmail(userEntity.email);
    return {
      message: 'The User Has Been Created Successfully',
      user: userEntity,
    };
  }

  async updateUser(
    id: number,
    attr: Partial<UpdateUserDto>,
  ): Promise<
    | {
        message: string;
        user: User;
      }
    | BadRequestException
  > {
    const user = await this.findOneById(id);
    if (!user) return new NotFoundException('User Not Found');

    Object.assign(user, attr);

    await this.userRepository.save(user);

    return {
      message: 'The User Has Been Updated Successfully',
      user: user,
    };
  }

  async deleteUser(id: number): Promise<
    | {
        message: string;
        user: User;
      }
    | NotFoundException
  > {
    const user = await this.findOneById(id);
    if (!user) return new NotFoundException('User Not Found');

    await this.userRepository.delete(id);

    return {
      message: 'The User Has Been Deleted Successfully',
      user: user,
    };
  }

  async login(user: UserLoginDto) {
    const { email, password } = user;
    const userSelected = await this.getUserByEmail(email);
    if (!userSelected)
      return new NotFoundException('Invalid Email Or Password');
    if (!bcrypt.compareSync(password, userSelected.password)) {
      return new BadRequestException('Invalid Email Or Password');
    }
    if(!userSelected.isVerified){
        return new BadRequestException("Email not verified");
    }
    const payload = {
      username: userSelected.username,
      id: userSelected.id,
      role: userSelected.role,
      isAdmin: userSelected.isAdmin,
      tel: userSelected.tel,
      email: userSelected.email,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: 'Logged In Successfully',
      access_token: access_token,
    };
  }


}
