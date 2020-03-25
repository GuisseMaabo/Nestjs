import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';




@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor ( private tasksService:TasksService){}
  
    @Get()
    getAllTasks(
      @Query() filterDto: GetTasksFilterDto
      
      ):Promise <Task[]> {
     return this.tasksService.getTasks(filterDto);
      
    }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise <void> {
      return this.tasksService.deleteTask(id);
    }/*
    
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id',ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipe ) status: TaskStatus,
    ): Promise <Task> {
      return this.tasksService.updateTaskStatus(id, status);
    }*/
    
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id: number,
      @Body('status') status: TaskStatus,
    ): Promise <Task> {
      return this.tasksService.updateTaskStatus(id, status);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto,
       @GetUser()user: User,
       ): Promise <Task> {
      return this.tasksService.createTask(createTaskDto,user);
    }
}
