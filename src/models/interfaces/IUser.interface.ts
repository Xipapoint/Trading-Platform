import { Document } from 'mongoose';
export interface IUser extends Document {
    id: string;
    username: string;
    // Hashed for more safety
    hashedPassword: string;
    email: string;
    avatar: string;
    // Have to work the same as in Steam
    addFriendLink: string;
    // Have to be hashed
    card: {type: string, ref: string}
    // Only one role is able
    role: string;
    age: number;
    balance: number;
    // Cooldown for trading
    cooldownTrade: Date;
    // Deposit limit to avoid currency depreciation
    cooldownPayment: Date
    preferredCurrency: string;
    status: string;
    friends: {
        userId: IUser['_id'];
        acceptedAt: Date;
    }[];
    refferalLink: string;
    // Amount of bidding participations between users for further use of AI model training
    participationInTrades: number;
    // Amount of successed trades between users for further use of AI model training
    successfulTrades: number;
    // Amount of engaged people for further use of AI model training
    referrals: number;
    // Amount of rewards for further use of AI model training
    rewardAmounts: number;
    // Amount of payments for further use of AI model training
    paymentAmount: number;
    // Amount of transactions for further use of AI model training
    transactionAmount: number;
    // Amount of items in trades for further use of AI model training
    tradesVolume: number;
    lastActive: Date;
    // Amount of trades last month for further use of AI model training
    tradesLastMonth: number;
    // Value of trades` density last month for further use of AI model training
    tradeDensityLastMonth: number;
    transactions: {type: string, ref: string}[]; 
    trades: {type: string, ref: string}[];
    payments: {type: string, ref: string}[]; 
    rewards: {type: String, ref: string}[];
    createdAt: Date; 
    updatedAt: Date; 
}