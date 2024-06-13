import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { PayOperation } from './Enum/PaymentOperation.enum'; // Подразумевается, что PayOperation - это enum или константы операций оплаты

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Object.values(PayOperation),
    nullable: false,
  })
  operation: string;

  @Column()
  amount: number;

  @Column()
  message: string;

  @Column({
    default: 'pending',
    enum: ['pending', 'completed', 'failed'],
  })
  status: string;

  @Column()
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.payments)
  user: User;
}
