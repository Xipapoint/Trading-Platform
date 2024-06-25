import { Repository } from "typeorm";
import { IGetWalletRequestDTO } from '../dto/req/GetWalletRequestDTO.interface';
import { Security } from "../utils/security";
import { IWalletServiceImpl } from "./impl/walletServiceImpl";
import { Wallet } from "../entity/Wallet";
import { AppDataSource } from "../dataSource";
import axios from "axios";
import jwt, { JwtPayload } from 'jsonwebtoken';
import producer from "../producer";
import { ICreateWalletRequestDTO } from "../dto/req/CreateWalletRequestDTO.interface";
import { IWalletRequestDTO } from "../dto/req/WalletRequestDTO.interface";

class WalletSerivce implements IWalletServiceImpl{
    private walletRepository: Repository<Wallet>;
    constructor(walletRepository: Repository<Wallet>){
        this.walletRepository = walletRepository;
    }
    //PRIVATE 
    async getWalletByToken(token: string): Promise<Wallet | null>{
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        return await this.walletRepository.findOne({where: {userId: userId}})
    }
    async getWalletById(walletId: string): Promise<Wallet | null>{
        return this.walletRepository.findOne({where: {id: walletId}})
    }

    //PUBLIC
    async createWallet(walletData: ICreateWalletRequestDTO): Promise<Wallet> {
        const walletAmount = await axios.get('/user/walletamount');
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
        await producer.publishMessage('notification_queue', "createWallet", wallet.id);
        return wallet;
    }
    async getWalletByUser(token: string): Promise<IGetWalletRequestDTO | null>{
       const wallet: Wallet | null = await this.getWalletByToken(token);

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
    async getBalanceByUser(token: string): Promise<number | null> {
        const wallet: Wallet | null = await this.getWalletByToken(token);
        if(wallet !== null){
           return wallet.balance;
        } else{
            return wallet;
        }
    }
    async changeWalletPassword(walletData: IWalletRequestDTO): Promise<Wallet>{
        const wallet: Wallet | null = await this.getWalletById(walletData.walletId);
        if(wallet === null){
            throw new Error("wallet doesnt exist")
        }
        const newWalletPassword: string = await Security.hash(walletData.walletPassword);
        wallet.walletNumber = newWalletPassword;
        return wallet;
    }
}

export default new WalletSerivce(AppDataSource.getRepository(Wallet));