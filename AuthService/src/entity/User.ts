import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  // Hashed for more safety
  @Column()
  hashedPassword: string;

  // Short access code, example: 4537. Have to be hashed aswell
  @Column()
  shortAccessCode: string;

  @Column()
  email: string;

  // Only one role is able
  @Column({ default: 'USER' })
  role: string;

  @Column()
  age: number;

  // @Column({ type: 'decimal',  default: 0.00 })
  // balance: number;

  // Cooldown for trading
  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  cooldownTrade: Date;

  // Deposit limit to avoid currency depreciation
  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  cooldownPayment: Date;

  @Column({ default: 'USD' })
  preferredCurrency: string;

  @Column({ nullable: true })
  avatar: string;

  // Have to work the same as in Steam
  @Column()
  addFriendLink: string;

  @Column()
  refferalLinkId: string;

  @Column()
  isActivated: boolean

  // // Amount of bidding participations between users for further use of AI model training
  // @Column({default: 0})
  // participationInTrades: number;

  // // Amount of successed trades between users for further use of AI model training
  // @Column({default: 0})
  // successfulTrades: number;

  // // Amount of engaged people for further use of AI model training
  // @Column({default: 0})
  // referrals: number;

  // // Amount of items in trades for further use of AI model training
  // @Column({default: 0})
  // tradesVolume: number;

  // @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  // lastActive: Date;

  // // Amount of trades last month for further use of AI model training
  // @Column({default: 0})
  // tradesLastMonth: number;

  // // Value of trades` density last month for further use of AI model training
  // @Column({default: 0})
  // tradeDensityLastMonth: number;

  @Column({ enum: ['online', 'offline'] })
  status: string;

  // @OneToMany(() => Card, card => card.user)
  // card: Card[];

  // @OneToMany(() => Transaction, transaction => transaction.user)
  // transactions: Transaction[];

  // @OneToMany(() => Trade, trade => trade.user)
  // trades: Trade[];

  // @OneToMany(() => Payment, payment => payment.user)
  // payments: Payment[];

  // @OneToMany(() => User, user => user.friends)
  // friends: User[];

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
