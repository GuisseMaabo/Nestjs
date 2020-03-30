import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'net';
import { Task } from './tasks/tasks.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
"reflect-metadata";



@Module({
  
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "cire",
    "password": "cire",
    "database": "gestion-tache",
    "synchronize": true,
    "logging": false,
    "entities": [Task,User],
    "migrations": [
       "src/migration/**//*/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**//*/*.ts"
    ]
    }),
    
    TasksModule,
    
    AuthModule,
  ],
})
export class AppModule {}
