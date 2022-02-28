import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../../database/entities/user.entity";
import AuthService from "./auth.service"

class AuthController {
    static register = async (req: Request, res: Response) => {
        let { email , password, firstname, lastname } = req.body.user;
        let user = new User();

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname
        user.password = password;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Hash the password, to securely store on DB
        user.hashPassword();
      
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
          const userData = await userRepository.save(user);
          const token = AuthService.getJwtToken(userData)

          //Send the jwt in the response
          res.send({
              message:"User Successfully registered",
              token:token
          });
        } catch (e) {
          console.log(e,"error while registering the user")
          
          res.status(409).send("username already in use");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("User created");
  };

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    console.log(req.body.user,"uuuuuuuuuuuuuuuuuu")
    let { email, password } = req.body.user;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });

        //Check if encrypted password match
    //   if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //     res.status(401).send();
    //     return;
    //   }
      
      const token = AuthService.getJwtToken(user)
    
                //Send the jwt in the response
        res.send({
            message:"User Successfully registered",
            token:token
        });

      } catch (error) {
      res.status(401).send();
     }

};

//   static changePassword = async (req: Request, res: Response) => {
//     //Get ID from JWT
//     const id = res.locals.jwtPayload.userId;

//     //Get parameters from the body
//     const { oldPassword, newPassword } = req.body;
//     if (!(oldPassword && newPassword)) {
//       res.status(400).send();
//     }

//     //Get user from the database
//     const userRepository = getRepository(User);
//     let user: User;
//     try {
//       user = await userRepository.findOneOrFail(id);
//     } catch (id) {
//       res.status(401).send();
//     }

//     //Check if old password matchs
//     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
//       res.status(401).send();
//       return;
//     }

//     //Validate de model (password lenght)
//     user.password = newPassword;
//     const errors = await validate(user);
//     if (errors.length > 0) {
//       res.status(400).send(errors);
//       return;
//     }
//     //Hash the new password and save
//     user.hashPassword();
//     userRepository.save(user);

//     res.status(204).send();
//   };
}
export default AuthController;