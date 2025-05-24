import { Request, Response } from 'express';
import { generateCard } from '../services/cardService';

export const generateCardHandler = (_req: Request, res: Response) => {
  try {
    const card = generateCard();
    res.status(200).json({ card });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate card', error });
  }
};
