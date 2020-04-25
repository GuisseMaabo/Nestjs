import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Individuals } from "src/auth/user.entity";


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

}