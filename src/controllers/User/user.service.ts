import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import { CreateUserInput } from "./types/CreateUserInput";

@Service()
export class UserService {
    async createUser(inputData:CreateUserInput,userRepository: Repository<User>){
        const { email,password,firstname,lastname,confirmPassword } = inputData
        const user =userRepository.create({
            firstname,
            lastname,
            email,
            password,
            });
        await userRepository.save(user);
        return user
    }
}
