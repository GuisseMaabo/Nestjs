import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
    
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService,
    ) {}

    

    /*async signUp ( authCredentialsAuth: AuthCredentialsDto ): Promise<void>{

        return this.userRepository.signUp(authCredentialsAuth);
    }*/
    async signUp (authCredentialsDto:AuthCredentialsDto): Promise <void> {
        const {username , password} = authCredentialsDto ;

        

        const user = new User();
        user.username=username;
        user.salt = await bcrypt.genSalt();
        user.password=await this.hashPassword(password, user.salt);
        await user.save();

        console.log(user.password);
        console.log(user.salt);

/*
        */

      
        
    }
    async signIn(authCredentialsDto:AuthCredentialsDto): Promise <{accessToken:string}>{
        const username = await this.ValidateUserPassword(authCredentialsDto);
        //console.log(result);

        const payload:JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }

    async ValidateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<string>{
        const {username,password}= authCredentialsDto;

        const user = await this.userRepository.findOne({username});
         if (user && await user.ValidatePassword(password)){
             return user.username;

         } else {

            return null;
         }

       
    }
    
    private async hashPassword(password:string , salt: string): Promise<string>{
        return bcrypt.hash(password,salt);
    }

    
}
