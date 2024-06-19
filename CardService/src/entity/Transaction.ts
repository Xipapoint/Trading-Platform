import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from './Card';

@Entity()
export class Transaction{
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
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
    
    @ManyToOne(() => Card, card => card.transactions)
    card: Card;
}