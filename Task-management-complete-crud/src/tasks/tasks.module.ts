import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.Repository';
import { Task } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';
"reflect-metadata";


@Module({

  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
   
    controllers: [TasksController],
    providers: [TasksService]
  })
export class TasksModule {}
