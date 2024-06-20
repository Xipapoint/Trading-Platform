import { IJwtUserRequestDto } from "../dto/request/JwtUserRequestDTO.dto";
import { User } from "../entity/User";

export class Mappers{
    static UserToJWTDTO(UserData: User): IJwtUserRequestDto{
        const id: string = UserData.id;
        const age = UserData.age;
        return {id, email, age};
    }
}