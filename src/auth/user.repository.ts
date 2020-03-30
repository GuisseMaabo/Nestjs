import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { SignupDto } from "./dto/signup.dto";

@EntityRepository(User)
export class UserRepository extends  Repository <User> {
    async signup(signupdto: SignupDto): Promise <void>{
        const {email, password} = signupdto;

        const user = new User();

        user.email = email;
        user.password = password;
        await user.save();

    }

}

