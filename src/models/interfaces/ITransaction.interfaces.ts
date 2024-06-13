import { Document } from 'mongoose';
import { IUser } from './IUser.interface';
export interface ITransaction extends Document{
    id: string;
    type: string;
    amount: number;
    userMessage: string;
    status: string; // e.g., "pending", "completed", "failed" - Added
    userId: IUser['_id'];
    createdAt: Date;
    updatedAt: Date;
}