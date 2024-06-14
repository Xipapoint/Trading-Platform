import { AppDataSource } from '../data-source';
import { RegiterUserRequestDto } from '../dto/user/request/RegisterUserRequestDTO.dto';
import { JwtUserResponseDto } from '../dto/user/response/JwtUserResponseDTO.dto';
import { User } from '../entity/User';
import { Security } from '../utils/security';
import UserServiceImpl from './impl/userServiceImpl';
import crypto from 'crypto';

export class UserService implements UserServiceImpl {

   async registration(RegisterData : RegiterUserRequestDto) : Promise<JwtUserResponseDto> {
        const userRepository = AppDataSource.getRepository(RegisterData.email);
        const existingUser = await userRepository.findOne({ where: { email: RegisterData.email } });
        // TODO: ЕСЛИ ПОЛЬЗОВАТЕЛЬ СУЩЕСТВУЕТ, ВЫВОДИМ ОШИБКУ
        const hashedPassword : string = await Security.hashPassword(RegisterData.password);
        const card : string = await Security.createCardNumber(); // Существует отдельная сущность Card, где нужно будет вставить эту функцию
        const addFriendLink = "username" //test
        const refferalLink = "refferal" //test

        const user: User = await AppDataSource.getRepository(User).create({hashedPassword, addFriendLink, refferalLink})

        return {accessToken: "dsgdsgs", refreshToken: "sfgsdg"} //test
    }
}