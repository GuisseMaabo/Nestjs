import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";


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

}