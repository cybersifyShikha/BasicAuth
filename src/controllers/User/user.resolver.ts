import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../database/entities/user.entity";
import {Inject, Service} from "typedi";

import { CreateUserInput } from "./types/CreateUserInput";
import { UserService } from "./user.service";

@Service()
@Resolver((_type) => User)
export class UserResolver {
  constructor(
    @Inject() private readonly userService: UserService,
    @Service('userRepository')
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    
  @Mutation(() => User)
  public async CreateUser(
    @Arg("data") inputData: CreateUserInput
  ): Promise<User|undefined> {
        try {
            const user = this.userService.createUser(inputData,this.userRepository)
            return user
        }
        catch(err){
            console.log(err,"Error while creating user")
            throw Error("Error while creating user")
        }
  }

  @Query(() =>[User])
  public async users():Promise<User[]>{
    return this.userRepository.find();
  }
}
