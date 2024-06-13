import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Card} from './Card'; // Подставьте вашу сущность Card
import {Transaction} from './Transactions'
import { Trade } from './Trade'; // Подставьте вашу сущность Trade
import {Payment} from './Payment'; // Подставьте вашу сущность Payment
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  // Hashed for more safety
  @Column()
  hashedPassword: string;

  @Column()
  email: string;

  // Only one role is able
  @Column({ default: 'USER' })
  role: string;

  @Column()
  age: number;

  @Column({ type: 'decimal',  default: 0.00 })
  balance: number;

  // Cooldown for trading
  @Column({ nullable: true })
  cooldownTrade: Date;

  // Deposit limit to avoid currency depreciation
  @Column({ nullable: true })
  cooldownPayment: Date;

  @Column({ default: 'USD' })
  preferredCurrency: string;

  @Column({ nullable: true })
  avatar: string;

  // Have to work the same as in Steam
  @Column()
  addFriendLink: string;

  @Column()
  refferalLink: string;

  // Amount of bidding participations between users for further use of AI model training
  @Column()
  participationInTrades: number;

  // Amount of successed trades between users for further use of AI model training
  @Column()
  successfulTrades: number;

  // Amount of engaged people for further use of AI model training
  @Column()
  referrals: number;

  // Amount of items in trades for further use of AI model training
  @Column()
  tradesVolume: number;

  @Column()
  lastActive: Date;

  // Amount of trades last month for further use of AI model training
  @Column()
  tradesLastMonth: number;

  // Value of trades` density last month for further use of AI model training
  @Column()
  tradeDensityLastMonth: number;

  @Column({ enum: ['online', 'offline'] })
  status: string;

  @OneToMany(() => Card, card => card.user)
  card: Card[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Trade, trade => trade.user)
  trades: Trade[];

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];

  @OneToMany(() => User, user => user.friends)
  friends: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
