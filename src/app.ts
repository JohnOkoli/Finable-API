import express from 'express';
import accountRoutes from './routes/accountRoute';
import ledgerRoutes from './routes/ledgerRoute';
import cardRoutes from './routes/cardRoute';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/card', cardRoutes);
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
