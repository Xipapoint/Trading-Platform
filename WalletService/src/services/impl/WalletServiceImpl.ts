import { ICreateWalletRequestDTO } from "../../dto/req/CreateWalletRequestDTO.interface"
import { IGetWalletRequestDTO } from "../../dto/req/GetWalletRequestDTO.interface"

export interface IWalletServiceImpl{
    createWallet(walletData: ICreateWalletRequestDTO): Promise<string>
    getWalletByUser(UserId: string): Promise<IGetWalletRequestDTO | null>
    getBalanceByUser(token: string): Promise<number>
    // TODO: ДОДЕЛАТЬ
    // createTransaction()
    // getTransactionByUser()
    // getAllTransactionsByUser()
}