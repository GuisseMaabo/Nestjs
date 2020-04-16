import { Repository, EntityRepository } from "typeorm";
import { Individuals } from "./user.entity";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from 'bcrypt';



@EntityRepository(Individuals)
export class UserRepository extends  Repository <Individuals> {
    async signup(signupdto: SignupDto): Promise <void>{
        const { Username, Your_Status , Full_Name, Email, Adress, Phone_Number, Password, Confirm_Password } = signupdto;


        
        const individual = new Individuals();

        individual.Username = Username;
        individual.Your_status = Your_Status;
        individual.Full_name = Full_Name;
        individual.Email = Email;
        individual.Adress = Adress;
        individual.Phone_Number = Phone_Number;  
        individual.salt =  await bcrypt.genSalt();
        individual.Password = await this.hashPassword(Password, individual.salt );
        individual.Confirm_Password = Confirm_Password 
        await individual.save();

    }

    private async hashPassword (Password : string , salt : string) : Promise <string> {
        return bcrypt.hash(Password,salt);
    }
     
    async validateIndividualPassword (signupdto: SignupDto) : Promise <string> {
        const { Username, Password} = signupdto ;
        const Individual = await this.findOne({Username});

        if (Individual && await Individual.validatePassword(Password)){
            return Individual.Username;

        } else {
            return null;
        }

    }
   

}

