/* eslint-disable */
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import {Reflector} from '@nestjs/core'
  import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
  constructor(
      private jwtService : JwtService,
      private reflector : Reflector
  ){}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        // 💡 See this condition
        return true;
      }


      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if(!token){
          throw new UnauthorizedException("No token Present")
      }
      try {
         const payload = await this.jwtService.verifyAsync(token , {
                secret : process.env.JWT_SIGN_KEY
         });
         
         request['user'] = payload;
      }catch(error){
          throw new UnauthorizedException("Invalid Token")
      }
  
      return true;
  }
  
  private extractTokenFromHeader(request: Request): string {
      try{
        const [type , token ] = request.headers.authorization.split(' ') ?? [];
      return type === 'Bearer' ? token : null;
      }catch(error){
        throw new UnauthorizedException("No Token is present")
      }
  }

  private 
  
  }