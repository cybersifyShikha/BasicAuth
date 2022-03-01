import { 
   Entity, 
   Column, 
   PrimaryGeneratedColumn, 
   CreateDateColumn,
   UpdateDateColumn, 
   BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("users")
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: "varchar" })
    firstname:string

    @Field()
    @Column()
    lastname:string

    @Field()
    @Column({unique:true})
    email: string

    @Field()
    @Column()
    password:string
   
    @Field()
    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;
   
    @Field()
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