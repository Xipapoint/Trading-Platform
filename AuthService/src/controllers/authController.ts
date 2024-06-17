import { NextFunction, Request, Response } from "express";
import { RegiterUserRequestDto } from "../dto/request/RegisterUserRequestDTO.dto";
import { JwtUserResponseDto } from "../dto/response/JwtUserResponseDTO.dto";
import UserService from "../services/authService";

class AuthController{
    async registration(req: Request<{}, {}, RegiterUserRequestDto>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userData: RegiterUserRequestDto = req.body;
            const tokens = await UserService.registrationService(userData);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(tokens);
        } catch (error) {
            return next(error);
        }
    }
}