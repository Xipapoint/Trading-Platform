import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtUserRequestDto } from "../dto/user/request/JwtUserRequestDTO.dto";

class TokenService{
    private jwt: typeof jwt;

    constructor() {
        this.jwt = jwt;
    }
    public generateTokens(payload: JwtUserRequestDto) {
        const accessToken = this.jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '30m' }
        );
        const refreshToken = this.jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '30d' }
        );

        return {
            accessToken,
            refreshToken
        };
    }
}

export default new TokenService();
