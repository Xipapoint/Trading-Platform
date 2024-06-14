import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Trade extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', default: 0.00 })
  amount: number;

  @Column({ type: 'decimal', default: 0.00 })
  price: number;

  @Column()
  currencyFrom: string;

  @Column()
  currencyTo: string;

  @Column()
  type: 'buy' | 'sell';

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'cancelled' | 'expired';

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, user => user.trades)
  user: User;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
