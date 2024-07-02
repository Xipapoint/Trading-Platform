import tokenService from "../services/tokenService";


export class Helpers{
    public static async getUserIdFromAccessToken(token: string): Promise<string> {
        try {
            const payload: string = await (tokenService.verifyAccessToken(token)).then(payload => payload.id);
            return payload
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
