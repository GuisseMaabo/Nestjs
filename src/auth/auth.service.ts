import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';



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

    async signIn ( signupdto: SignupDto) : Promise<{ accessToken: string }>  {
 
        const username = await this.userRepository.validateIndividualPassword(signupdto);
        
        if (!username) {
            throw new UnauthorizedException ('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
    
        return { accessToken };
    }
/*
    public forgetpasswordmail(): void {
        this
          .mailerService
          .sendMail({
            to: 'test@nestjs.com',
            from: 'cireguisse2015@gmail.com',
            subject: '(You foret your password clic the link below Testing Nest Mailermodule with template ✔',
            template: __dirname + '/welcome', // The `.pug` or `.hbs` extension is appended automatically.
            context: {  // Data to be 0,nsent to template engine.
              code: 'cf1a3f828287',
              username: 'john doe',
            },
          })
          .then(() => {})
          .catch(() => {});
      }*/


}
