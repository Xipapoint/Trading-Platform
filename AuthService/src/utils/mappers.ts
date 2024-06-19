import { IJwtUserRequestDto } from "../dto/request/JwtUserRequestDTO.dto";
import { User } from "../entity/User";

export class Mappers{
    static UserToJWTDTO(UserData: User): IJwtUserRequestDto{
        const id: string = UserData.id;
        const email: string = UserData.email;
        const age = UserData.age;
        const prefferedCurrency: string = UserData.preferredCurrency; 
        return {id, email, age, prefferedCurrency};
    }
}