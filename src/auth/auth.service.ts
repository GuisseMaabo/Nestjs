import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp (signupdto: SignupDto): Promise <void> {
        return this.userRepository.signup(signupdto);
    }

    async signIn ( signindto: SignInDto) : Promise<{ accessToken: string }>  {
 
        const Email = await this.userRepository.validateIndividualPassword(signindto);
        
        if (!Email) {
            throw new UnauthorizedException ('Invalid credentials');
        }

        const payload: JwtPayload = { Email };
        const accessToken = await this.jwtService.sign(payload);
    
        return { accessToken };
    }



}
