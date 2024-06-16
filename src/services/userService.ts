import { AppDataSource } from '../data-source';
import { RegiterUserRequestDto } from '../dto/user/request/RegisterUserRequestDTO.dto';
import { JwtUserResponseDto } from '../dto/user/response/JwtUserResponseDTO.dto';
import { User } from '../entity/User';
import { Mappers } from '../utils/mappers';
import { Security } from '../utils/security';
import TokenService from './TokenService';
import UserServiceImpl from './impl/userServiceImpl';

export class UserService implements UserServiceImpl {

   async registration(RegisterData : RegiterUserRequestDto) : Promise<JwtUserResponseDto> {
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

        const user: User = await AppDataSource.getRepository(User).create({hashedPassword, shortAccessCode, age, username, email, addFriendLink, refferalLink})

        const tokens: JwtUserResponseDto = TokenService.generateTokens(Mappers.UserToJWTDTO(user));
        return tokens
    }
}