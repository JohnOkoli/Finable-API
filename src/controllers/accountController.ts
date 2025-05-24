import { Request, Response } from 'express';
import { createAccount } from '../services/accountService';

export const createAccountHandler = async (req: Request, res: Response) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create account', error });
  }
};
