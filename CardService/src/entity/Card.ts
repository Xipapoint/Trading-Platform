import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class Card{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    // Has to be hashed
    @Column()
    cardNumber: string;
    // Has to be hashed and cointaned 3-4 numbers
    @Column()
    cardPassword: string;

    @Column()
    isActivated: boolean;

    @Column()
    balanceId: number
    
    @Column()
    userId: string;

    @OneToMany(() => Transaction, transaction => transaction.card)
    transactions: Transaction[];

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    activatedAt: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}