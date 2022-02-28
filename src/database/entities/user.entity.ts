import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn, 
   CreateDateColumn,
   UpdateDateColumn, 
   BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    firstname:string

    @Column()
    lastname:string

    @Column({unique:true})
    email: string

    @Column()
    password:string

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
       return bcrypt.compareSync(unencryptedPassword, this.password);
    } 
}