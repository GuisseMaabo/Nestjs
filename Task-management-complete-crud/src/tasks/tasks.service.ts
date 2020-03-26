import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.Repository';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';



@Injectable()
export class TasksService {
  
  constructor (
    @InjectRepository(Task)
    private task: Task,
    private taskRepository: TaskRepository,
  )  {}

  async  getTasks(
    filterDto:GetTasksFilterDto,
    user:User,
     
    ) : Promise <Task[]>{
    const {status,search}=filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

      query.where('task.userId = :userId', {userId: user.id});
   
    
    if (status) {
      query.andWhere('task.status = status', {status} );
  }

  if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
  }
  const tasks = await query.getMany();
 

    return tasks; 
   
  }

   
async getTaskById(id: number,
  user:User
  ): Promise <Task> {
      const found = await this.taskRepository.findOne({where : {id, userId: user.id}});

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not founod`);
    }

    return found;
    }
    
    async createTask (
      createTaskDto:CreateTaskDto,
      user:User,
      ):Promise <Task> {

      const {title,description}= createTaskDto;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user=user;

      await task.save();
      delete task.user;
      return task;
  }

  async deleteTask(id:number,
    user:User,
    ) : Promise<void> {
    const result = await this.taskRepository.delete({id, userId: user.id});
    // console.log (result);
    if (result.affected=== 0) {
      throw new NotFoundException(`Task with ID "${id}" not founod`);
    }
    
  }

   async  updateTaskStatus(
     id: number, 
     status: TaskStatus,
     user: User,
     ): Promise <Task> {
      const task = await this.getTaskById(id,user);
      task.status = status;
       await task.save();
      return task;
   }

    
}
