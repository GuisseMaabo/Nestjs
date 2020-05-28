import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class EmailVerification {

    @PrimaryColumn()
    Email: String
    @Column()
    emailToken: String
    @Column()
    timestamp: Date
  };