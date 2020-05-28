import { Injectable, UnauthorizedException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { EmailRepo } from './emailverification.repo';
import { ForgottenRepo } from './forgottenpassword.repo';
import { Individuals } from './user.entity';
import { ForgottenPassword } from './forgottenpassword.entity';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private emailVerifRepository: EmailRepo,
        private forgottenRepository: ForgottenRepo,
        private jwtService: JwtService,
    ){}

    async signUp (signupdto: SignupDto): Promise <void> {
        return this.userRepository.signup(signupdto);
    }
    
    async signIn ( signindto: SignInDto) : Promise<{ accessToken: string }>  {
        const  { user_id,
          Email,
          Full_name,
          photo,
          edit_photo,
        } = signindto; 
        
       // const {email = await this.userRepository.validateIndividualPassword(signindto);
        
        if (!Email) {
            throw new UnauthorizedException ('Invalid credentials');
        }
         
        const payload  = { Full_name,user_id,
          Email,
          photo,
          edit_photo,
        } ;
        
        const accessToken = await this.jwtService.sign(payload);
        
    
        return { accessToken };
    }

    
    
      async getUserById(
        id: number,
        user :  Individuals,
        ): Promise<Individuals> {
        const found = await this.userRepository.findOne(id);
    
        if (!found) {
          throw new NotFoundException(`User with ID "${id}" not found`);
        }
    
        return found;
      }
    /*
   
   async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
    var forgottenPassword= await this.forgottenRepository.findOne({email: email});
    if (forgottenPassword && ( (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15 )){
      throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const forgottenPasswordModel = await this.forgottenRepository.sendEmailForgotPassword(
        {email: email},
        { 
          email: email,
          newPasswordToken: JSON.stringify(Math.floor(Math.random() * (9000000)) + 1000000),  //Generate 7 digits number,
          timestamp: new Date()
        },
        {upsert: true, new: true}
      );
      if(forgottenPasswordModel){
        return forgottenPasswordModel;
      } else {
        throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
    
*/



}
