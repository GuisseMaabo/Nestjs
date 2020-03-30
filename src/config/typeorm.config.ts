import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = ({

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'cire',
    password: 'cire',
    database: 'bioxevent',
    entities: [User],

    synchronize: true
});