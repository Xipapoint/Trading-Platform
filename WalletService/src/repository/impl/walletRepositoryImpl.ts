import { Wallet } from "../../entity/Wallet";

export interface IWalletRepository{
    getWalletByToken(token: string): Promise<Wallet | null>;
    getWalletById(walletId: string): Promise<Wallet | null>;
}