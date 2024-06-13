import { Document } from 'mongoose';
import { PayOperation } from '../Enum/PaymentOperation.enum';
import { IUser } from './IUser.interface';
export interface IPayment extends Document{
    id: string;
    operation: PayOperation;
    amount: number;
    message: string;
    status: string; // e.g., "pending", "completed", "failed" - Added
    currency: string;
    userId: IUser['_id'];
    createdAt: Date;
    updatedAt: Date;
}