import { ICreateWalletRequestDTO } from "../../dto/req/CreateWalletRequestDTO.interface"
import { IGetWalletRequestDTO } from "../../dto/req/GetWalletRequestDTO.interface"
import { IWalletRequestDTO } from "../../dto/req/WalletRequestDTO.interface"
import { Wallet } from "../../entity/Wallet"
import { WalletChangeOperation } from "../../entity/WalletChange"

export interface IWalletServiceImpl{
    createWallet(walletData: ICreateWalletRequestDTO): Promise<Wallet>
    getWalletByUser(UserId: string): Promise<IGetWalletRequestDTO | null>
    getBalanceByUser(token: string): Promise<number | null>
    changeWalletPassword(walletData: IWalletRequestDTO): Promise<Wallet>
    setActiveCurrentCard(walletId: string, token: string): Promise<Wallet>
    // TODO: ДОДЕЛАТЬ
    freezeCard(walletId: string): Promise<Wallet>
    getWalletHistoryChanges(walletId: string): Promise<WalletChangeOperation[]>
    setWalletChangeOperationTitle(walletChangeOperationId: number, newTitle: string): Promise<string>

    // createTransaction()
    // getTransactionByUser()
    // getAllTransactionsByUser()
}