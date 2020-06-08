import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Individuals } from "src/auth/user.entity";
import { ListParticipant } from "src/auth/entities/ListParticipants.entity";


@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event_title: string;

    @Column()
    location : string ;

    @Column()
    starts: string;

    @Column()
    ends: string;

    @Column()
    event_description : string ;

    @Column()
    event_type:string;

    @Column()
    event_topic:string;

    @Column()
    event_image: string;   

    @ManyToOne(type=> Individuals, individual=> individual.event, { eager: false})
    individual:Individuals;

    @Column()
    individualId : number;

    @OneToMany((type) => ListParticipant, participants=> participants.event , { eager: false })
    @JoinColumn()
    Participants: ListParticipant;
}