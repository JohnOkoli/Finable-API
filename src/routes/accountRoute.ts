import express, { Request, Response } from 'express';
import {
    createAccount,
    listAccounts,
    decryptData,
    healthCheck
} from '../controllers/accountController';


    const routes = express.Router();

    routes.get('/health', healthCheck);
    routes.post('/accounts', createAccount);
    routes.get('/list', listAccounts);
    routes.post('/decrypt', decryptData);

    export default routes;