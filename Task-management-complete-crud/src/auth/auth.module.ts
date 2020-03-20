import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { from } from 'rxjs';

@Module({

  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'Topsecret',
      signOptions: {
        expiresIn:3600,
      },      
    }),
  TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
