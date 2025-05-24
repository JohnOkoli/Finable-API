import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI || !process.env.ENC_KEY || !process.env.ENC_IV) {
  throw new Error('Missing required environment variables');
}

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  encryptionKey: process.env.ENC_KEY,
  encryptionIV: process.env.ENC_IV
};
