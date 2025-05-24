import { Request, Response } from 'express';
import { listAccounts, decryptInputData } from '../services/ledgerService';

export const listAccountsHandler = async (_req: Request, res: Response) => {
  try {
    const accounts = await listAccounts();
    res.status(200).json({ accounts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to list accounts', error });
  }
};

export const decryptDataHandler = async (req: Request, res: Response) => {
  try {
    const decrypted = decryptInputData(req.body);
    res.status(200).json({ decrypted });
  } catch (error) {
    res.status(500).json({ message: 'Failed to decrypt data', error });
  }
};
