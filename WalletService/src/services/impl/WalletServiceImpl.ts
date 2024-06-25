import { ICreateWalletRequestDTO } from "../../dto/req/CreateWalletRequestDTO.interface"
import { IGetWalletRequestDTO } from "../../dto/req/GetWalletRequestDTO.interface"
import { Wallet } from "../../entity/Wallet"

export interface IWalletServiceImpl{
    createWallet(walletData: ICreateWalletRequestDTO): Promise<Wallet>
    getWalletByUser(UserId: string): Promise<IGetWalletRequestDTO | null>
    getBalanceByUser(token: string): Promise<number | null>
    // TODO: ДОДЕЛАТЬ
    // changeWalletPassword(walletData: IWalletRequestDTO): Promise<Wallet>
    // activateCard(walletData: IWalletRequestDTO): Promise<Wallet>
    // freezeCard(walletData: IWalletRequestDTO): Promise<Wallet>

    // createTransaction()
    // getTransactionByUser()
    // getAllTransactionsByUser()
}