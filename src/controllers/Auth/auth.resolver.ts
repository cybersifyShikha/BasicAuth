import { Arg, Mutation, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../database/entities/user.entity";
import {Inject, Service} from "typedi";

import AuthService from "./auth.service";
import RegisterInput from "./types/RegisterInput";
import { AuthResponse } from "./types/AuthResponse";
import { UserService } from "../User/user.service";
import { LoginInput } from "./types/LoginInput";

@Service()
@Resolver((_type) => User)
export class AuthResolver {
  constructor(
    @Inject() private readonly authService: AuthService,
    @Inject() private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    
  @Mutation(() => AuthResponse )
  public async Register(
    @Arg("data") inputData: RegisterInput
  ): Promise<AuthResponse> {
        try {
            const userData = await this.userService.createUser(inputData,this.userRepository);
            const token = await this.authService.getJwtToken(userData)                
            return {
                message:"Succesfully Regsitered",
                token:token,
            }
        }
        catch(err){
            console.log(err,"Error while creating user")
            throw Error("Error while creating user")
        }
  }

  @Mutation(() => AuthResponse)
  public async Login(
    @Arg("data") inputData: LoginInput
  ): Promise<AuthResponse> {
        try {
            const { email, password } = inputData
            const user = await this.userRepository.findOneOrFail({ where: { email } });
        
            //Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                return{
                    message:'Invalid password'
                }
            }
            
            const token = await this.authService.getJwtToken(user)
            
            return {
                message:"User successfully logged In",
                token:token
            }
              
        }
        catch(err){
            console.log(err,"Error while creating user")
            throw Error("Error while creating user")
        }
  }
}
