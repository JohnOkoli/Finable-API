import express from 'express';
import { generateCardHandler } from '../controllers/cardController';

const router = express.Router();

router.get('/generate-card', generateCardHandler);

export default router;
