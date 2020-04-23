import { TypeOrmModuleOptions } from "@nestjs/typeorm";

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