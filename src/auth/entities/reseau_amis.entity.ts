import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Individuals } from "../user.entity";

@Entity()
export class ReseauAmis extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_participant1: number;

    @Column()
    id_participant2: number;

    @ManyToOne((type)=> Individuals, individual=> individual.reseau_amis, {eager: false})
    participant1: Individuals;


    @Column()
    participantId: number;

} 