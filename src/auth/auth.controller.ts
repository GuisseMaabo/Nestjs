import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { ResponseSuccess, ResponseError } from '../common/response.dto';
import { IResponse } from '../common/interfaces/response.interface';



@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){

    }

    @Post('/signup')
    signUp(@Body() signupDto: SignupDto): Promise <void>{
        return this.authService.signUp(signupDto);

    }

    @Post('/signin')
    signIn(@Body() signinDto: SignInDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(signinDto);

    }/*

    @Get('email/forgot-password/:email')
    public async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
      try {
        var isEmailSent = await this.authService.sendEmailForgotPassword(params.email);
        if(isEmailSent){
          return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
        } else {
          return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
        }
      } catch(error) {
        return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
      }
    }
    /*
  
    @Post('email/reset-password')
    @HttpCode(HttpStatus.OK)
    public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
      try {
        var isNewPasswordChanged : boolean = false;
        if(resetPassword.email && resetPassword.currentPassword){
          var isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
          if(isValidPassword) {
            isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
          } else {
            return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
          }
        } else if (resetPassword.newPasswordToken) {
          var forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
          isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
          if(isNewPasswordChanged) await forgottenPasswordModel.remove();
        } else {
          return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
        }
        return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
      } catch(error) {
        return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
      }
    }
  
    */
}
