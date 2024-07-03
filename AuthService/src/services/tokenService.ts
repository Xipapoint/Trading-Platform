import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtUserRequestDto } from "../dto/request/JwtUserRequestDTO.dto";
import { Token } from "../entity/Tokens";
import { AppDataSource } from "../dataSource";
import { ITokenServiceImpl } from "./impl/tokenService.impl";
import { IJwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";
import { Repository } from "typeorm";

class tokenService implements ITokenServiceImpl{
    private jwt: typeof jwt;
    private tokenRepository: Repository<Token>;

    constructor(tokenRepository: Repository<Token>) {
        this.tokenRepository = tokenRepository
        this.jwt = jwt;
    }
    public generateTokens(userId: string, userAge: number) : IJwtUserResponseDto {
        const payload = {userId, userAge}
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
        const refreshTokenEntity: Token = this.tokenRepository.create({userId, refreshToken})
        this.tokenRepository.save(refreshTokenEntity)

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

    public async verifyAccessToken(token: string): Promise<JwtPayload | null> {
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
            return userData
        } catch(e){
            return null
        }

    }

    public async verifyRefreshToken(token: string): Promise<JwtPayload> {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    }
}

export default new tokenService(AppDataSource.getRepository(Token));
