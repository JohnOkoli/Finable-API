import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import accountRoute from './routes/accountRoute';
import { errorHandler } from './middlewares/errorHandler';


dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/account', accountRoute);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI || '')
    .then(() => 
        console.log('Connected to MongoDB'))   
    .catch(err => {
        console.error('Failed to connect to MongoDB: ', err);
        process.exit(1);
    });

export default app;