import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.Repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ForgottenRepo } from './forgottenpassword.repo';
import { EmailRepo } from './emailverification.repo';



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 7200,
      },
    }),

    TypeOrmModule.forFeature([
      UserRepository,
      ForgottenRepo,
      EmailRepo,
    ]),

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
