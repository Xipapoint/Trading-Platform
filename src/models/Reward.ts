import { Schema, model } from 'mongoose';
import { IReward } from './interfaces/IReward.interface';

const rewardSchema = new Schema<IReward>({
    type: { type: String, required: true },
    date: { type: Date },
});

const Reward = model<IReward>('Reward', rewardSchema);

export default Reward;