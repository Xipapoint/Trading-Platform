import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction';
import { WalletChangeOperation } from './WalletChange';

@Entity('wallets')
export class Wallet{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    // Has to be hashed
    @Column()
    walletNumber: string;
    // Has to be hashed and cointaned 3-4 numbers
    @Column({length: 255})
    walletPassword: string;

    @Column({default: false})
    isFreezed: boolean;

    @Column({default: true})
    isCurrentActive: boolean;

    @Column({ type: 'decimal',  default: 0.00 })
    balance: number;

    // Deposit limit to avoid currency depreciation
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    cooldownPayment: Date;

    @Column({ default: 'USD' })
    preferredCurrency: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    activatedAt: Date;
    
    @Column()
    userId: string;

    @OneToMany(() => WalletChangeOperation, walletChangeOperation => walletChangeOperation.wallet)
    walletChangeOperations: WalletChangeOperation[]

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}