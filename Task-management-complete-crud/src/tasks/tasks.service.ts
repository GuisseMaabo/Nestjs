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
    filterDto:GetTasksFilterDto
     
    ) : Promise <Task[]>{
    const {status,search}=filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

      
   
    
    if (status) {
      query.andWhere('task.status = status', {status} );
  }

  if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
  }
  const tasks = await query.getMany();
 

    return tasks; 
   
  }

/*
    getAllTasks() {
      return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {

      const { status, search } = filterDto;

      let tasks = this.getAllTasks;
      
      return this.tasks;

    }
*/
   
async getTaskById(id: number): Promise <Task> {
      const found = await this.taskRepository.findOne(id);

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

  async deleteTask(id:number) : Promise<void> {
    const result = await this.taskRepository.delete(id);
    // console.log (result);
    if (result.affected=== 0) {
      throw new NotFoundException(`Task with ID "${id}" not founod`);
    }
    
  }
    /*
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
      
      return this.taskRepository.createTask(createTaskDto);
    }
    /*
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title,description} = createTaskDto;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      await task.save();
      return task;
  }
/*
    getTaskById(id: string): Task {
      const found = this.tasks.find(task => task.id === id);
      if (!found){
        throw new NotFoundException();
      }
      return found;
    }


    createTask(createTaskDto: CreateTaskDto): Task {
      const { title, description } = createTaskDto;
      const task: Task = {
        id: uuidv4(),
        title,
        description,
        status: TaskStatus.OPEN,
      };
      
    this.tasks.push(task);
    return task;
    }
    deleteTask(id: string): void {
      const found =this.getTaskById(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
    }*/

   async  updateTaskStatus(id: number, status: TaskStatus): Promise <Task> {
      const task = await this.getTaskById(id);
      task.status = status;
       await task.save();
      return task;
   }/*

    updateTaskStatus(id: string, status: TaskStatus): Task {
      const task = this.getTaskById(id);
      task.status = status;
      return task;
    }*/

    
}
