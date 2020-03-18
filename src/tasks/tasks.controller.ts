import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './tasks.entity';




@Controller('tasks')
export class TasksController {
    constructor ( private tasksService:TasksService){}
  /*
    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
      if(Object.keys(filterDto).length){
        return this.tasksService.getTasksWithFilters(filterDto);
      } else {
        return this.tasksService.getAllTasks();
      }
      
    }*/

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }/*

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
      this.tasksService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id: string,
      @Body('status') status: TaskStatus,
    ): Task {
      return this.tasksService.updateTaskStatus(id, status);
    }
    */
    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto ): Promise <Task> {
      return this.tasksService.createTask(createTaskDto);
    }
}
