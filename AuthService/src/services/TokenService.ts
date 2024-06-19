import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtUserRequestDto } from "../dto/request/JwtUserRequestDTO.dto";
import { Token } from "../entity/Tokens";
import { AppDataSource } from "../dataSource";
import { ITokenServiceImpl } from "./impl/tokenService.impl";
import { IJwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";

class tokenService implements ITokenServiceImpl{
    private jwt: typeof jwt;

    constructor() {
        this.jwt = jwt;
    }
    public generateTokens(payload: IJwtUserRequestDto) : IJwtUserResponseDto {
        const accessToken = this.jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: '15m' }
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

    public async saveToken(userId: string, refreshToken: string): Promise<Token> {
        const tokenRepository = AppDataSource.getRepository(Token);
        const tokenData: Token | null = await tokenRepository.findOneBy({userId: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenRepository.save(tokenData);
        }
        const token = await tokenRepository.create({userId: userId, refreshToken})
        return token;
    }

    public async verifyAccessToken(token: string): Promise<JwtPayload> {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    }

    public async verifyRefreshToken(token: string): Promise<JwtPayload> {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    }
}

export default new tokenService();
