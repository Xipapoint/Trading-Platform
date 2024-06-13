import { Schema, model } from 'mongoose';
import { IPayment } from './interfaces/IPayment.interface';
import { PayOperation } from './Enum/PaymentOperation.enum';

const paymentSchema = new Schema<IPayment>({
    operation: { type: String, enum: Object.values(PayOperation), required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Payment = model<IPayment>('Payment', paymentSchema);

export default Payment;
