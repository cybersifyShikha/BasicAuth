import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../../database/entities/user.entity";

@ObjectType()
@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  firstname?: string;
  
  @Field()
  lastname?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  confirmPassword?: string;
}