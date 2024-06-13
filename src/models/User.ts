import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './interfaces/IUser.interface';


const userSchema: Schema<IUser> = new Schema({
    id: {type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    email: {type: String, required: true},
    card: [{type: Schema.Types.ObjectId, ref: 'Card'}],
    role: {type: String, required: true, default: "USER"},
    age: {type: Number, required: true},
    balance: {type: Number, required: true, default: 0.00},
    cooldownTrade: {type: Date}, 
    cooldownPayment: {type: Date}, 
    preferredCurrency: {type: String, required: true, default: "USD"},
    avatar: {type: String},
    addFriendLink: {type: String, required: true},
    friends: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        acceptedAt: { type: Date, default: Date.now },
    }],
    refferalLink: { type: String, required: true },
    participationInTrades: { type: Number, required: true },
    successfulTrades: { type: Number, required: true },
    referrals: { type: Number, required: true },
    rewards: [{ type: String, ref: String, required: true }],
    tradesVolume: { type: Number, required: true },
    lastActive: { type: Date, required: true },
    tradesLastMonth: { type: Number, required: true },
    tradeDensityLastMonth: { type: Number, required: true },
    status: { type: String, enum: ['online', 'offline']},
    transactions: [{type: Schema.Types.ObjectId, ref: 'Transaction'}],
    trades: [{type: Schema.Types.ObjectId, ref: 'Trade'}],
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;