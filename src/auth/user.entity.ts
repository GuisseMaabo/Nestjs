import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Individuals extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Username: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    @Column()
    Full_name: string;
    
    @Column()
    Your_status: string;

    @Column()
    Adress: string;

    @Column()
    Phone_Number: string;

    @Column()
    Confirm_Password: string ;

    @Column()
    salt:string;

    async validatePassword (Password:string): Promise <boolean> {
        const  hash = await bcrypt.hash ( Password, this.salt );
        return hash === this.Password;
    }

}