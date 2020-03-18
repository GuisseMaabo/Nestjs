import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "cire",
    "password": "cire",
    "database": "gestion-tache",
    "synchronize": true,
    "logging": false,
    "entities": [__dirname + "/**/*/entity.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ]
   }
)
