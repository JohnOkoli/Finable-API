import { Document } from 'mongoose';

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