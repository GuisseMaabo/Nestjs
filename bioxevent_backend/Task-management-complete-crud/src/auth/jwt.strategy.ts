import {PassportStrategy} from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Strategy,ExtractJwt} from 'passport-Jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private user = User,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'Topsecret',
        });
    }
    async validate (payload:JwtPayload):Promise <User> {
        const {username}= payload;
        const user = await this.user.findOne({username});
        if (!user){

            throw new UnauthorizedException();
        }
        return user;
    }

}