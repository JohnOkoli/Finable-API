import express from 'express';
import { listAccountsHandler, decryptDataHandler } from '../controllers/ledgerController';

const router = express.Router();

router.get('/accounts', listAccountsHandler);
router.post('/decrypt', decryptDataHandler);

export default router;
