import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Helpers } from "../utils/helpers";
import { IUserServiceImpl } from "./impl/userServiceImpl";
import tokenService from "./tokenService";
import { AppDataSource } from "../dataSource";

class UserService implements IUserServiceImpl{
    private userRepository: Repository<User>;
    constructor(userRepository: Repository<User>){
        this.userRepository = userRepository
    }
    async getUserWalletAmount(token: string): Promise<number | null> {
        const userId: string = await Helpers.getUserIdFromAccessToken(token);
        const user: User | null = await this.userRepository.findOne({where: {id: userId}})
        if(user !== null){
            return user.walletAmount;
        }
        return null
    }
    
}

export default new UserService(AppDataSource.getRepository(User))