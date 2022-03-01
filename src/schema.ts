import { buildSchema } from "type-graphql";
import { AuthResolver } from "./controllers/Auth/auth.resolver";
import { UserResolver } from "./controllers/User/user.resolver";

export default (Container:any)=>{
    return buildSchema({
        container:Container,
        // orphanedTypes:[CreateUserInput],
        resolvers:[UserResolver,AuthResolver],
    })
}