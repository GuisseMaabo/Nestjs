import { EntityRepository, Repository } from "typeorm";
import { EmailVerification } from "src/auth/emailverification.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

@EntityRepository(EmailVerification)
export class EmailRepo extends  Repository <EmailVerification> {

    async createEmailToken(email: string): Promise<boolean> {
        var emailVerification = await this.findOne({Email: email}); 
        if (emailVerification && ( (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15 )){
          throw new HttpException('LOGIN.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
          var emailVerificationModel = await this.update( 
            
            {Email: email},
            { 
              Email: email,
              emailToken: JSON.stringify( Math.floor(Math.random() * (9000000)) + 1000000), //Generate 7 digits number
              timestamp: new Date()
            },
            
          );
          return true;
        }
      }

    
    
}