import { Repository, EntityRepository } from "typeorm";
import { ForgottenPassword } from "./forgottenpassword.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import {nodemailer} from 'nodemailer';
import {default as config} from 'config';



@EntityRepository(ForgottenPassword)
export class ForgottenRepo extends Repository <ForgottenPassword>{

    async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
        let  forgottenPassword= await this.findOne({email: email});
        if (forgottenPassword && ( (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15 )){
          throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
          var forgottenPasswordModel = await this.update(
            {email: email},
            { 
              email: email,
              newPasswordToken: JSON.stringify(Math.floor(Math.random() * (9000000)) + 1000000),  //Generate 7 digits number,
              timestamp: new Date()
            },
            
          );
          if( forgottenPassword ){

            return forgottenPassword;

          } else {
            throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      }
/*
      async sendEmailVerification(email: string): Promise <boolean> {   
        var model = await this.findOne({ email: email});
    
        if(model && model.emailToken){
            let transporter = nodemailer.createTransport({
                host: config.mail.host,
                port: config.mail.port,
                secure: config.mail.secure, // true for 465, false for other ports
                auth: {
                    user: config.mail.user,
                    pass: config.mail.pass
                }
            });
        */

}