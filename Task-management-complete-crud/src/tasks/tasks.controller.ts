import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-task.dto';




@Controller('tasks')
export class TasksController {
    constructor ( private tasksService:TasksService){}
  
    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto) {
     return this.tasksService.getTasks(filterDto);
      
    }/*

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise <void> {
      return this.tasksService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id',ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipe ) status: TaskStatus,
    ): Promise <Task> {
      return this.tasksService.updateTaskStatus(id, status);
    }
    /*
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
