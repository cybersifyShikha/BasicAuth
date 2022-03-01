import { Field, InputType, ObjectType } from "type-graphql";
import { LoginInput } from "./LoginInput";

@ObjectType()
@InputType()
class RegisterInput extends LoginInput {
    @Field()
    firstname:string

    @Field()
    lastname:string

    @Field()
    confirmPassword:string
}

export default RegisterInput;