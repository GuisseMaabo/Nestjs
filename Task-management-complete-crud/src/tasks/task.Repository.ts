import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task.dto";

@EntityRepository (Task)
export class TaskRepository extends Repository <Task> {
    async getTasks(filterDto:GetTasksFilterDto){
    const {status,search} = filterDto;
    const query = this.createQueryBuilder('task');

    
    if (status) {
        query.andWhere('task.status = status', {status} );
    }

    if (search) {
        query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }
    const tasks = await query.getMany();
    return tasks;
    }
}
