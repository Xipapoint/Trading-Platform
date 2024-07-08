import { Repository, W } from "typeorm";
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
import { WalletChangeOperation } from "../entity/WalletChange";

class WalletSerivce implements IWalletServiceImpl{
    private walletRepository: Repository<Wallet>;
    private walletChangeOperationRepository: Repository<WalletChangeOperation>;
    constructor(walletRepository: Repository<Wallet>, walletChangeOperationRepository: Repository<WalletChangeOperation>){
        this.walletRepository = walletRepository;
        this.walletChangeOperationRepository = walletChangeOperationRepository;
    }
    //PRIVATE 
    async getWalletByToken(token: string): Promise<Wallet | null>{
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        return await this.walletRepository.findOne({where: {userId: userId}})
    }
    async getWalletById(walletId: string): Promise<Wallet | null>{
        return this.walletRepository.findOne({where: {id: walletId}})
    }

    async getWalletsByUser(token: string): Promise<string[]>{
        let walletsIds: string[] = []
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        const wallets: Wallet[] = await this.walletRepository.findBy({userId: userId})
        for(let i = 0; i < wallets.length; i++){
            walletsIds[i] = wallets[i].id;
        }
        return walletsIds;
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
        await this.walletRepository.save(wallet);
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
        wallet.walletPassword = newWalletPassword;
        await this.walletRepository.save(wallet)
        return wallet;
    }

    async setActiveCurrentCard(walletId: string, token: string): Promise<Wallet> {
        const userId: string = (jwt.verify(token, 'test') as JwtPayload).id
        const walletsId: string[] = await this.getWalletsByUser(token);
        if(walletsId.length === 0) throw new Error("No wallets created by user")
        const wallet = await this.getWalletById(walletId);
        if(wallet === null) throw new  Error("Couldnt find wallet")
        await producer.publishMessage('user_queue', 'activated_wallet', userId, walletId) // с await или без
        // Установить wallet.isCurrentActive в true
        return wallet
    }
    async freezeCard(walletId: string): Promise<Wallet>{
        const wallet: Wallet | null = await this.getWalletById(walletId);
        if(wallet === null){
            throw new Error("The wallet doesnt exist")
        }
        wallet.isFreezed = true;
        await this.walletRepository.save(wallet)
        return wallet;
    }

    //WALLET OPERATION CHANGES
    async getWalletHistoryChanges(walletId: string): Promise<WalletChangeOperation[]>{
       const walletChangeOperations: WalletChangeOperation[] | null = await this.walletChangeOperationRepository.find(
        {where: 
            {wallet: 
                {id: walletId}
            }
        }
       )
        if(walletChangeOperations === null){
            throw new Error("Couldnt find wallet operation")
        }

        return walletChangeOperations
    }
    async setWalletChangeOperationTitle(walletChangeOperationId: number, newTitle: string): Promise<string>{
        if(typeof walletChangeOperationId !== 'number'){
            throw new Error("Invalid ID of wallet operation")
        }
        const walletChangeOperation: WalletChangeOperation | null = await this.walletChangeOperationRepository.findOne({where: {id: walletChangeOperationId}})
        if(walletChangeOperation === null){
            throw new Error("Couldnt find wallet operation")
        }
        const previousTitle: string = walletChangeOperation.title;
        walletChangeOperation.title = newTitle
        await this.walletChangeOperationRepository.save(walletChangeOperation);
        if(previousTitle === walletChangeOperation.title) throw new Error("Couldnt change title. Try again")
        return walletChangeOperation.title;
    }
}
export default new WalletSerivce(AppDataSource.getRepository(Wallet), AppDataSource.getRepository(WalletChangeOperation));