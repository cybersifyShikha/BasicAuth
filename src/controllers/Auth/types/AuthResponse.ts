import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  message: string;

  @Field()
  token?: string;
}