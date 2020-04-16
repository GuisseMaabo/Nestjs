import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name_ticket: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    description: string;

}