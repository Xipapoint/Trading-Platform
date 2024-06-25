import jwt, { JwtPayload } from "jsonwebtoken"
import { Wallet } from "../entity/Wallet"
import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
import { IWalletRepository } from "./impl/walletRepositoryImpl";

class WalletRepository implements IWalletRepository{
    private walletRepository: Repository<Wallet>;
    constructor(walletRepository: Repository<Wallet>){
        this.walletRepository = walletRepository;
    }
    async getWalletByToken(token: string): Promise<Wallet | null>{
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        return await this.walletRepository.findOne({where: {userId: userId}})
    }
    async getWalletById(walletId: string): Promise<Wallet | null>{
        return this.walletRepository.findOne({where: {id: walletId}})
    }
}

export default new WalletRepository(AppDataSource.getRepository(Wallet));