import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Event } from "src/event/event.entity";

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

    @OneToMany(type =>Event, event=>event.individual, { eager : true})
    event: Event [];

    async validatePassword (Password:string): Promise <boolean> {
        const  hash = await bcrypt.hash ( Password, this.salt );
        return hash === this.Password;
    }

}