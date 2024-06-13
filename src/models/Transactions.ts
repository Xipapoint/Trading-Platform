import { Schema, model } from 'mongoose';
import { ITransaction } from './interfaces/ITransaction.interfaces';

const transactionSchema = new Schema<ITransaction>({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    userMessage: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Ссылка на пользователя
});

const Transaction = model<ITransaction>('Transaction', transactionSchema);

export default Transaction;