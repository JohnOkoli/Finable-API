import Account from '../models/accountModel';
import { decryptSensitiveData } from './encryptionService';

export const listAccounts = async () => {
  const accounts = await Account.find();

  return accounts.map((account) => {
    const decrypted = decryptSensitiveData({
      cardNumber: account.cardNumber,
      cvv: account.cvv,
      expiryDate: account.expiryDate,
      phoneNumber: account.phoneNumber,
      dateOfBirth: account.dateOfBirth,
    });

    return {
      fullName: `${account.firstName} ${account.surname}`,
      accountNumber: account.accountNumber,
      encrypted: {
        cardNumber: account.cardNumber,
        cvv: account.cvv,
        expiryDate: account.expiryDate,
        phoneNumber: account.phoneNumber,
        dateOfBirth: account.dateOfBirth,
      },
      decrypted,
    };
  });
};

export const decryptInputData = (data: {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  phoneNumber: string;
  dateOfBirth: string;
}) => {
  return decryptSensitiveData(data);
};
