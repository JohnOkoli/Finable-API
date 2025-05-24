import Account from '../models/accountModel';
import { IAccount } from '../models/accountModel';
import { encrypt } from '../Utils/crypto';
import { generateAccountNumber } from '../Utils/generator';
import { generateCard } from './cardService';

interface CreateAccountInput {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
}

export const createAccount = async (input: CreateAccountInput): Promise<IAccount> => {
  const accountNumber = generateAccountNumber();
  const card = generateCard();

  const encryptedPhone = encrypt(input.phoneNumber);
  const encryptedDOB = encrypt(input.dateOfBirth);
  const encryptedCardNumber = encrypt(card.cardNumber);
  const encryptedCVV = encrypt(card.cvv);
  const encryptedExpiryDate = encrypt(card.expiryDate);

  const account = new Account({
    firstName: input.firstName,
    surname: input.surname,
    email: input.email,
    phoneNumber: encryptedPhone,
    dateOfBirth: encryptedDOB,
    address: input.address,
    accountNumber,
    cardNumber: encryptedCardNumber,
    cvv: encryptedCVV,
    expiryDate: encryptedExpiryDate,
  });

  await account.save();
  return account;
};

export const getAllAccounts = async (): Promise<IAccount[]> => {
  return Account.find();
};
