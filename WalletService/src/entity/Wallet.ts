import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Wallet{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    // Has to be hashed
    @Column()
    walletNumber: string;
    // Has to be hashed and cointaned 3-4 numbers
    @Column()
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
    
    @Column()
    userId: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    activatedAt: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}