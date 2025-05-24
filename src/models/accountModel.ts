import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
    firstName: string;
    surname: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    accountNumber: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    cardNumber: { type: String, required: true, unique: true },
    cvv: { type: String, required: true, unique: true },
    expiryDate: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAccount>('Account', AccountSchema);