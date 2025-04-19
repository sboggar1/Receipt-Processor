import { logger } from './logger';
import { Receipt } from '../types/receipt';

export const calculatePoints = (receipt: Receipt): number => {
  let points = 0;

  logger.debug('Calculating points for receipt:', receipt);

  if (receipt.retailer) {
    points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
  }

  if (parseFloat(receipt.total) % 1 === 0) {
    points += 50;
  }

  if ((parseFloat(receipt.total) * 100) % 25 === 0) {
    points += 25;
  }

  if (receipt.items?.length) {
    points += Math.floor(receipt.items.length / 2) * 5;

    receipt.items.forEach((item) => {
      if (item.shortDescription.trim().length % 3 === 0) {
        points += Math.ceil(parseFloat(item.price) * 0.2);
      }
    });
  }

  const [year, month, day] = receipt.purchaseDate.split('-').map(Number);
  if (day % 2 === 1) {
    points += 6;
  }

  const [hour] = receipt.purchaseTime.split(':').map(Number);
  if (hour >= 14 && hour < 16) {
    points += 10;
  }

  logger.debug(`Calculated points: ${points}`);
  return points;
};
