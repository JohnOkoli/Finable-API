import { encrypt, decrypt } from '../Utils/crypto';

export const encryptSensitiveData = (data: {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  phoneNumber: string;
  dateOfBirth: string;
}) => {
  return {
    cardNumber: encrypt(data.cardNumber),
    cvv: encrypt(data.cvv),
    expiryDate: encrypt(data.expiryDate),
    phoneNumber: encrypt(data.phoneNumber),
    dateOfBirth: encrypt(data.dateOfBirth),
  };
};

export const decryptSensitiveData = (data: {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  phoneNumber: string;
  dateOfBirth: string;
}) => {
  return {
    cardNumber: decrypt(data.cardNumber),
    cvv: decrypt(data.cvv),
    expiryDate: decrypt(data.expiryDate),
    phoneNumber: decrypt(data.phoneNumber),
    dateOfBirth: decrypt(data.dateOfBirth),
  };
};
