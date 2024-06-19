import { NextFunction, Request, Response } from "express";
import { RegiterUserRequestDto } from "../../dto/request/RegisterUserRequestDTO.dto";

export default interface IAuthControllerImpl{
    registration(req: Request<{}, {}, RegiterUserRequestDto>, res: Response, next: NextFunction): Promise<Response | void>
}