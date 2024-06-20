export interface IGetWalletRequestDTO{
    walletNumber: string;
    isCurrentActive: boolean;
    isFreezed: boolean;
    balance: number;
    preferredCurrency: string;
    activatedAt: Date;
}