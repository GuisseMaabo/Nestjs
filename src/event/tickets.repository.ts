import { Repository, EntityRepository } from "typeorm";
import { Ticket } from "./tickets.entity";

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {

}