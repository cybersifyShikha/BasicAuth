import * as jwt from "jsonwebtoken";
import config from "../../config/JwtSecret";

class AuthService {
    static getJwtToken = async(user: { id: any; email: any; })=>{
        console.log(user,"userrrrrrrrrrrrrrrrrrr")
        const { id,email } = user
        const token = jwt.sign(
                    { userId: id, username: email },
                    config.jwtSecret,
                    { expiresIn: "1h" }
                );
         console.log(token,"token.........................")
         return token
    }
}

export default AuthService;