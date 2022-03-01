import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../../database/entities/user.entity";

@ObjectType()
@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}