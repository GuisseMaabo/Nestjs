import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){

    }

    @Post('/signup')
    signUp(@Body() signupDto: SignupDto): Promise <void>{
        return this.authService.signUp(signupDto);

    }
}
