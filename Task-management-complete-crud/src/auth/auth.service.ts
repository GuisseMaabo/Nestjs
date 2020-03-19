import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    /*async signUp ( authCredentialsAuth: AuthCredentialsDto ): Promise<void>{

        return this.userRepository.signUp(authCredentialsAuth);
    }*/
    async signUp (authCredentialsDto:AuthCredentialsDto): Promise <void> {
        const {username , password} = authCredentialsDto ;

        const user = new User();
        user.username=username;
        user.password=password;
        await user.save();
    }
}
