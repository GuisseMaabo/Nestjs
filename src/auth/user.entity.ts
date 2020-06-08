import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, TableForeignKey, JoinColumn, ManyToOne, ManyToMany, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Event } from "src/event/event.entity";
import {ReseauAmis} from './entities/reseau_amis.entity'
import { ListParticipant } from './entities/ListParticipants.entity';

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

    @OneToMany((type) => ReseauAmis, reseau_amis=>reseau_amis.participant1 , { eager: true })
    @JoinColumn()
    reseau_amis: ReseauAmis;

    @ManyToMany((type) => ListParticipant, listParticipant=>listParticipant.user , { eager: true })
    @JoinColumn()
    listParticipant: ListParticipant;

}