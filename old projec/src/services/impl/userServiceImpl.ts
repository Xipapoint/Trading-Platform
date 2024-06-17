import { JwtUserResponseDto } from "../../dto/user/response/JwtUserResponseDTO.dto";
import { RegiterUserRequestDto } from '../../dto/user/request/RegisterUserRequestDTO.dto';

export default interface UserServiceImpl{
    registration(RegisterData : RegiterUserRequestDto) : Promise<JwtUserResponseDto>
}