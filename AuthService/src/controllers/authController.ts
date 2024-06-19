import { NextFunction, Request, Response } from "express";
import { IRegiterUserRequestDto } from "../dto/request/RegisterUserRequestDTO.dto";
import UserService from "../services/authService";
import IAuthServiceImpl from "../services/impl/authServiceImpl";
import authService from "../services/authService";

class AuthController{
    private authService: IAuthServiceImpl;
    constructor( authService: IAuthServiceImpl){
        this.authService = authService;
    }
    async registration(req: Request<{}, {}, IRegiterUserRequestDto>, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userData: IRegiterUserRequestDto = req.body;
            const tokens = await UserService.registrationService(userData);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(tokens);
        } catch (error) {
            return next(error);
        }
    }

    async verifyShortAccessCode(req: Request, res: Response): Promise<Response> {
        const token = req.cookies.refreshToken;
        const { shortAccessCode } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const isCodeValid = await this.authService.verifyShortAccessCode(token, shortAccessCode);
            if (isCodeValid) {
                return res.status(200).json({ message: 'Short access code is valid' });
            } else {
                return res.status(400).json({ message: 'Invalid short access code' });
            }
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export default new AuthController(authService);