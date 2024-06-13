import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Card extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    // Has to be hashed
    @Column()
    cardNumber: string;
    // Has to be hashed and cointaned 3-4 numbers
    @Column()
    cardPassword: number;

    @OneToOne(() => User, user => user.card)
    user: User;
}