import mongoose, {Document, Schema} from 'mongoose';

export interface IAccount extends Document {
    firstName: String;
    surname: String;
    email: String;
    phoneNumber: String;
    dateOfBirth: String;
    address: String;
    accountNumber: String;
    cardNumber: String;
    cvv: String;
    expiryDate: String;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    dateOfBrith: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        unique: true,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    cvv: {
        type: String,
        unique: true,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IAccount>( 'Account', AccountSchema );