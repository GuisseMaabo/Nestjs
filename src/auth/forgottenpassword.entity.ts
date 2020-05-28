import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class ForgottenPassword{
    @PrimaryColumn()
    email: String
    @Column()
    newPasswordToken: String
    @Column()
    timestamp: Date
  };