import crypto from 'crypto';

const alogorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'utf-8');
const ivlength =16; // For AES block size

if (key.length !== 32) {
  throw new Error('Encryption key must be 32 bytes/characters long');
}

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(ivlength);
  const cipher = crypto.createCipheriv(alogorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
}

export function decrypt(encryptedText: string): string {
    const [ivEncoded, encryptedData] =encryptedText.split(':');
    if( !ivEncoded || !encryptedData) {
        throw new Error('Invalid encrypted text format');
    };
    const iv = Buffer.from(ivEncoded, 'base64');
    const decipher = crypto.createDecipheriv(alogorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}