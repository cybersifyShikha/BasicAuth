import * as jwt from "jsonwebtoken";
import config from "../../config/JwtSecret";

class AuthService {
    static getJwtToken = async(user: { id: any; email: any; })=>{
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