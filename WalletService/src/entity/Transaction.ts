import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from './Wallet';

@Entity()
export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    personalSenderName: string

    @Column()
    personalRecipientName: string
    
    @Column()
    type: string;
  
    @Column()
    amount: number;
  
    @Column()
    userMessage: string;
  
    @Column({ default: 'pending', enum: ['pending', 'completed', 'failed'] })
    status: string;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column()
    walletSenderId: string;

    @Column()
    walletRecipientId: string;

    @BeforeInsert()
    setPersonalName(){
        this.personalSenderName = this.id;
        this.personalRecipientName = this.id;
    }
}