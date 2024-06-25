import { Repository } from 'typeorm';
import { AppDataSource } from '../dataSource';
import { ILoginUserRequestDto } from '../dto/request/LoginUserRequestDTO.dto';
import { IRegiterUserRequestDto } from '../dto/request/RegisterUserRequestDTO.dto';
import { IJwtUserResponseDto } from '../dto/response/JwtUserResponseDTO.dto';
import { User } from '../entity/User';
import { Mappers } from '../utils/mappers';
import { Security } from '../utils/security';
import IAuthServiceImpl from './impl/authServiceImpl';
import bcrypt from 'bcrypt';
import { ITokenServiceImpl } from './impl/tokenService.impl';
import TokenService from './tokenService';
import { ISecureRegisterResponseDTO } from '../dto/response/SecureRegisterResponseDTO';
import producer from '../producer';
import { Helpers } from '../utils/helpers';

class AuthService implements IAuthServiceImpl {
    private tokenService: ITokenServiceImpl;
    private userRepository: Repository<User>;
    constructor(tokenService: ITokenServiceImpl, userRepository: Repository<User>){
        this.tokenService = tokenService;
        this.userRepository = userRepository
    }
    //PRIVATE

    private async secureRegisterData(RegisterData: IRegiterUserRequestDto): Promise<ISecureRegisterResponseDTO>{
        const hashedPassword: string = await Security.hash(RegisterData.password);
        const shortAccessCode: string = await Security.hash(RegisterData.shortAccessCode);
        const email: string = RegisterData.email;
        const addFriendLink: string= "http:/localhost:3000/addfriend/" + await Security.generateRandomUUID();
        const age: number = RegisterData.age;
        const username: string = RegisterData.username;

        return { hashedPassword, shortAccessCode, age, username, email, addFriendLink }
    }



    // PUBLIC 
   async registrationService(RegisterData: IRegiterUserRequestDto) : Promise<IJwtUserResponseDto> {
        const existingUser = await this.userRepository.findOne({ where: { email: RegisterData.email } });
        if(existingUser){
            throw new Error("User already exists");
        }
        const secureData: ISecureRegisterResponseDTO = await this.secureRegisterData(RegisterData);
        const walletAmount: number = 1;
        const user: User = this.userRepository.create({...secureData, walletAmount})
        // producer.publishMessage('create_inventory', user.id);
        // producer.publishMessage('create_profile', user.id);
        const tokens: IJwtUserResponseDto = this.tokenService.generateTokens(Mappers.UserToJWTDTO(user));
        return tokens
    }

    async verifyShortAccessCode(token: string, shortAccessCode: string): Promise<boolean> {
        const sessionUserId: string = await Helpers.getUserIdFromAccessToken(token);
        const user = await this.userRepository.findOne({where: { id: sessionUserId }});

        if (!user) {
            throw new Error('User not found');
        }

        const isCodeMatch = await bcrypt.compare(shortAccessCode, user.shortAccessCode);
        return isCodeMatch;
    }

    async login(LoginData: ILoginUserRequestDto): Promise<IJwtUserResponseDto> {
        const existingUser: User | null = await this.userRepository.findOne({ where: { email: LoginData.email } });
        if(existingUser === null){
            throw new Error("User doesnt exist");
        }
        const password: string = LoginData.password;
        const isPassEquals: boolean = await bcrypt.compare(password, existingUser.hashedPassword);
        if (!isPassEquals) {
            throw Error('Неверный пароль');
        }
        const tokens: IJwtUserResponseDto = this.tokenService.generateTokens(Mappers.UserToJWTDTO(existingUser));
        await this.tokenService.saveToken(existingUser.id, tokens.refreshToken);
        return tokens;
    }
}
export default new AuthService(TokenService, AppDataSource.getRepository(User));