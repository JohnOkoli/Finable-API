import { Request, Response, NextFunction } from 'express';
import Account, {IAccount } from '../models/accountModel';
import { encrypt, decrypt } from '../Utils/crypto';

  export const createAccount = async (req: Request, res: Response) => {
     const { firstName, surname, email, phoneNumber, dateOfBirth } = req.body;
        if (!firstName || !surname || !email || !phoneNumber || !dateOfBirth) {
        return res.status(400).json({ message: 'All fields are required' });
        }

     let accountNumber: number;
     do {
       accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
     } while (await Account.findOne({ accountNumber }));

     const cardNumber = generateCardNumber();
     const cvv = generateCVV();
     const expiryDate = new Date();
     expiryDate.setFullYear(expiryDate.getFullYear() + 3);

     const encryptedPhoneNumber = encrypt(phoneNumber);
     const encryptedDateOfBirth = encrypt(dateOfBirth);
     const encryptedCardNumber = encrypt(cardNumber);
     const encryptedCVV = encrypt(cvv);
     const encryptedExpiryDate = encrypt(expiryDate.toISOString());

     const account = new Account({
       firstName,
       surname,
       email,
       phoneNumber: encryptedPhoneNumber,
       dateOfBirth: encryptedDateOfBirth,
       accountNumber,
       cardNumber: encryptedCardNumber,
       cvv: encryptedCVV,
       expiryDate: encryptedExpiryDate,
     });

     await account.save();

     res.status(201).json({
       accountNumber,
       fullName: `${firstName} ${surname}`,
       phoneNumber: { encrypted: encryptedPhoneNumber, decrypted: decrypt(encryptedPhoneNumber) },
       dateOfBirth: { encrypted: encryptedDateOfBirth, decrypted: decrypt(encryptedDateOfBirth) },
       cardNumber: { encrypted: encryptedCardNumber, decrypted: decrypt(encryptedCardNumber) },
       cvv: { encrypted: encryptedCVV, decrypted: decrypt(encryptedCVV) },
       expiryDate: { encrypted: encryptedExpiryDate, decrypted: new Date(decrypt(encryptedExpiryDate)) },
     });
   };

export const listAccounts = async (_req: Request, res: Response) => {
    try {
        const accounts = await Account.find();
        const response = accounts.map((acct) => ({
            accountNumber: acct.accountNumber,
            fullName: `${acct.firstName} ${acct.surname}`,
            encrypted: {
                phoneNumber: acct.phoneNumber,
                dataOfBirth: acct.dateOfBirth,
                cardNumber: acct.cardNumber,
                cvv: acct.cvv,
                expiryDate: acct.expiryDate,
            },
            decrypted: {
                phoneNumber: decrypt(acct.phoneNumber.toString()),
                dataOfBirth: decrypt(acct.dateOfBirth.toString()),
                cardNumber: decrypt(acct.cardNumber.toString()),
                cvv: decrypt(acct.cvv.toString()),
                expiryDate: decrypt(acct.expiryDate.toString()),
            },
        }));
        res.status(200).json({ accounts: response});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const decryptData = async (req: Request, res: Response) => {
    try {
        const { encryptedData } = req.body;
        if (!encryptedData) {}

        const decryptedData = decrypt(encryptedData);
        res.json({ decryptedData });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid encrypted data or key' });
    }
}

export function healthCheck(req: Request, res: Response) {
    res.json({ message: 'Lastcode bender API for Finable is running' });
}

    //Functions to generate account number, CVV, card number, and expiry date
    function generateAccountNumber(): string {
        let num = '';
        for (let i = 0; i < 10; i++) {
            num += Math.floor(Math.random() * 10).toString();
        }
        return num;
    }
    /*OR
function generateAccountNumber(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}*/

function generateCardNumber(): string {
    let num = '';
    for (let i = 0; i < 16; i++) {
        num += Math.floor(Math.random() *10).toString();
    }
    return num;
}

function generateCVV(): string {
    let num = '';
    for (let i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10).toString();
    }
    return num;

    //OR
    //function gneerateCVV(): string {
    // return Math.floor(100 + Math.random() * 900).toString();
}
function generateExpiryDate(): string {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() + 3;
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`; // Format: MM/YY
}
//OR
/*function generateExpiryDate(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
}*/

//Ensure email uniqueness
export const ensureUniqueEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email, phoneNumber, accountNumber, cardNumber } = req.body;
    //Ensure email uniqueness
    const existingEmail = await Account.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    //Ensure phone number uniqueness
    const existingPhoneNumber = await Account.findOne({ phoneNumber });
    if (existingPhoneNumber) {
        return res.status(400).json({ message: 'Phone number already exists' });
    }
    //Ensure account number uniqueness
    const existingAccountNumber = await Account.findOne({ accountNumber });
    if (existingAccountNumber) {
        return res.status(400).json({ message: 'Account number already exists' });
    }
    //Ensure card number uniqueness
    const existingCardNumber = await Account.findOne({ cardNumber });
    if (existingCardNumber) {
        return res.status(400).json({ message: 'Card number already exists' });
    }
    // If all checks pass, proceed to create the account
    next();
};