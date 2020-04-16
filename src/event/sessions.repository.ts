import { Repository, EntityRepository } from "typeorm";
import { Sessions } from "./sessions.entity";

@EntityRepository(Sessions)
export class SessionRepository extends Repository<Sessions> {
    
}