import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async signUp (signupdto: SignupDto): Promise <void> {
        return this.userRepository.signup(signupdto);
    }
}
