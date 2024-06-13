import { Document } from "mongodb";

export interface ICard extends Document{
    id: number;
    cardNumber: string;
    cardPassword: number;
}