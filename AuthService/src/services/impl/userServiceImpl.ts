import { JwtUserResponseDto } from "../../dto/response/JwtUserResponseDTO.dto";
import { RegiterUserRequestDto } from '../../dto/request/RegisterUserRequestDTO.dto';

export default interface UserServiceImpl{
    registrationService(RegisterData : RegiterUserRequestDto) : Promise<JwtUserResponseDto>
}