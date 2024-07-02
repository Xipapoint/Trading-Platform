import { ICreateWalletRequestDTO } from "../../dto/req/CreateWalletRequestDTO.interface"
import { IGetWalletRequestDTO } from "../../dto/req/GetWalletRequestDTO.interface"
import { IWalletRequestDTO } from "../../dto/req/WalletRequestDTO.interface"
import { Wallet } from "../../entity/Wallet"

export interface IWalletServiceImpl{
    createWallet(walletData: ICreateWalletRequestDTO): Promise<Wallet>
    getWalletByUser(UserId: string): Promise<IGetWalletRequestDTO | null>
    getBalanceByUser(token: string): Promise<number | null>
    // TODO: ДОДЕЛАТЬ
    changeWalletPassword(walletData: IWalletRequestDTO): Promise<Wallet>
    setActiveCurrentCard(walletId: string, token: string): Promise<Wallet>
    freezeCard(walletId: string): Promise<Wallet>


    // createTransaction()
    // getTransactionByUser()
    // getAllTransactionsByUser()
}