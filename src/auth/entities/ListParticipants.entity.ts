import { BaseEntity, Entity, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Individuals } from "../user.entity";
import {Event } from "src/event/event.entity";


@Entity()
export class ListParticipant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idListParticipant: number;


  
    @OneToMany((type) => Individuals, user=>user.listParticipant , { eager: false })
    @JoinColumn()
    user: Individuals;



    @OneToOne((type) => Event, event=> event.Participants, { eager: true }) 
    @JoinColumn()
    event: Event [] ;




}