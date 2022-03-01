import * as jwt from "jsonwebtoken";
import { Service } from "typedi";
import config from "../../config/JwtSecret";
import { User } from "../../database/entities/user.entity";

@Service()
class AuthService {
    async getJwtToken(user: User){
        const { id,email } = user
        const token = jwt.sign(
                    { userId: id, username: email },
                    config.jwtSecret,
                    { expiresIn: "1h" }
                );

         return token
    }
}

export default AuthService;