import { Document } from 'mongoose';
export interface IReward extends Document{
    type: string,
    date: Date,
}

