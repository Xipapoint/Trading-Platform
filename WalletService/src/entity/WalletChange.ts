import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from './Wallet';

@Entity('walletChangeOperations')
export class WalletChangeOperation{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string

    @ManyToOne(() => Wallet, wallet => wallet.walletChangeOperations)
    wallet: Wallet;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


    @BeforeInsert()
    setTitle() {
        if (!this.title) {
            this.title = crypto.randomUUID();
        }
    }
}