import { IGetCardRequestDTO } from "../../dto/req/GetCardRequestDTO.interface"

export interface ICardServiceImpl{
    createCard(userId: string): void
    getCardByUser(token: string): Promise<IGetCardRequestDTO>
    // TODO: ДОДЕЛАТЬ
    // createTransaction()
    // getTransactionByUser()
    // getAllTransactionsByUser()
}