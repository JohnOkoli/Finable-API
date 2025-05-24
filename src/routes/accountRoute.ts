import express from 'express';
import { createAccountHandler } from '../controllers/accountController';

const router = express.Router();

router.post('/accounts', createAccountHandler);

export default router;
