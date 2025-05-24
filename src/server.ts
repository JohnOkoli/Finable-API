import { connectDB } from './configs/db';
import { config } from './configs/config';
import app from './app';

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
