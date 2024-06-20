export interface IGetCardResponseDTO{
    walletNumber: string;
    isCurrentActive: boolean;
    isFreezed: boolean;
    balance: number;
    preferredCurrency: string;
    activatedAt: Date;
}