import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository (Task)
export class TaskRepository extends Repository <Task> {
   
}
