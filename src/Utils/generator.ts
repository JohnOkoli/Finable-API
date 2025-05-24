export const generateAccountNumber = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const generateCardNumber = (): string => {
  let cardNumber = '';
  for (let i = 0; i < 4; i++) {
    cardNumber += Math.floor(1000 + Math.random() * 9000).toString();
  }
  return cardNumber;
};

export const generateCVV = (): string => {
  return Math.floor(100 + Math.random() * 900).toString();
};

export const generateExpiryDate = (): string => {
  const currentDate = new Date();
  const futureYear = currentDate.getFullYear() + 3;
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(futureYear).slice(-2);
  return `${month}/${year}`;
};
