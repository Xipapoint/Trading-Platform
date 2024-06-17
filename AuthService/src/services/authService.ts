import { AppDataSource } from '../dataSource';
import { RegiterUserRequestDto } from '../dto/request/RegisterUserRequestDTO.dto';
import { JwtUserResponseDto } from '../dto/response/JwtUserResponseDTO.dto';
import { User } from '../entity/User';
import producer from '../producer';
import { Mappers } from '../utils/mappers';
import { Security } from '../utils/security';
import TokenService from './TokenService';
import UserServiceImpl from './impl/userServiceImpl';

class AuthService implements UserServiceImpl {

   async registrationService(RegisterData : RegiterUserRequestDto) : Promise<JwtUserResponseDto> {
        const userRepository = AppDataSource.getRepository(RegisterData.email);
        const existingUser = await userRepository.findOne({ where: { email: RegisterData.email } });
        if(existingUser){
            throw new Error("User already exists");
        }
        const hashedPassword : string = await Security.hash(RegisterData.password);
        const shortAccessCode: string = await Security.hash(RegisterData.shortAccessCode);
        const email: string = await Security.hash(RegisterData.email);
        const addFriendLink: string = await Security.generateRandomUUID();;
        const refferalLink: string = await Security.generateRandomUUID()
        const age: number = RegisterData.age;
        const username: string = RegisterData.username;

        const user: User = await AppDataSource.getRepository(User).create({hashedPassword, shortAccessCode, age, username, email, addFriendLink})
        await producer.publishMessage("createCard", user.id);
        await producer.publishMessage("createInventory", user.id);
        const tokens: JwtUserResponseDto = TokenService.generateTokens(Mappers.UserToJWTDTO(user));
        return tokens
    }
}
export default new AuthService();