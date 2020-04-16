import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {  Individuals } from "src/auth/user.entity";
import { Ticket } from "src/event/tickets.entity";
import { Sessions } from "src/event/sessions.entity";


export const typeOrmConfig: TypeOrmModuleOptions = ({

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'cire',
    password: 'cire',
    database: 'bioxevent',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],

    synchronize: true
});