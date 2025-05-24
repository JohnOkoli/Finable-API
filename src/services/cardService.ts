import { generateCardNumber, generateCVV, generateExpiryDate } from '../Utils/generator';

export const generateCard = () => {
  return {
    cardNumber: generateCardNumber(),
    cvv: generateCVV(),
    expiryDate: generateExpiryDate(), // 3 years in the future
  };
};
