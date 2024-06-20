import { Repository } from "typeorm";
import { IGetWalletRequestDTO } from '../dto/req/GetWalletRequestDTO.interface';
import { Security } from "../utils/security";
import { IWalletServiceImpl } from "./impl/WalletServiceImpl";
import { Wallet } from "../entity/Wallet";
import { AppDataSource } from "../dataSource";
import axios from "axios";
import { ICreateWalletRequestDTO } from "../dto/req/CreateWalletRequestDTO.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';

class WalletSerivce implements IWalletServiceImpl{
    private walletRepository: Repository<Wallet>;
    constructor(walletRepository: Repository<Wallet>){
        this.walletRepository = walletRepository;
    }
    async createWallet(walletData: ICreateWalletRequestDTO): Promise<string> {
        const walletAmount = await axios.get('/api/user/walletamount');
        if(walletAmount.status === 400){
            throw new Error("User cant have more than 2 cards ")
        }
        if(walletAmount.status === 500){
            throw new Error("Something went wrong")
        }
        const walletNumber: string = await Security.createWalletNumber();
        const walletPassword: string = await Security.hash(walletData.walletPassword);
        const userId: string = walletData.userId;
        const wallet: Wallet = this.walletRepository.create({walletNumber, walletPassword, userId})
        return wallet.walletNumber;
    }
    async getWalletByUser(token: string): Promise<IGetWalletRequestDTO | null>{
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        const wallet: Wallet | null = await this.walletRepository.findOne({where: {userId: userId}})

        if(wallet !== null){
            const walletNumber: string = wallet.walletNumber;
            const balance: number = wallet.balance;
            const activatedAt: Date = wallet.activatedAt;
            const preferredCurrency: string =wallet.preferredCurrency
            const isFreezed: boolean = wallet.isFreezed
            const isCurrentActive: boolean = wallet.isCurrentActive

            return {walletNumber, balance, activatedAt, preferredCurrency, isFreezed, isCurrentActive} ;
        }
        return wallet;
    }
    getBalanceByUser(token: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

}

export default new WalletSerivce(AppDataSource.getRepository(Wallet));