import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.Repository';
import { Task } from './tasks.entity';
"reflect-metadata";


@Module({

  imports:[
    TypeOrmModule.forFeature([Task])
  ],
   
    controllers: [TasksController],
    providers: [TasksService]
  })
export class TasksModule {}
