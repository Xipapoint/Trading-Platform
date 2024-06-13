import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    id: string;
    username: string;
    password: string;
    email: string;
    cardNumber: string;
    role: string;
    age: number;
    balance: number;
    cooldown: Date
    prefferedCurrency: string;
}

const userSchema: Schema<IUser> = new Schema({
    id: {type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String, required: true},
    cardNumber: {type: String, required: true, unique: true},
    role: {type: String, required: true, default: "USER"},
    age: {type: Number, required: true},
    balance: {type: Number, required: true, default: 0.00},
    cooldown: {type: Date}, 
    prefferedCurrency: {type: String, required: true, default: "USD"}
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;