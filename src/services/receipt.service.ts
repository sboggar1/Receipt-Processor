import { logger } from '../utils/logger';
import { Receipt } from '../types/receipt';
import { calculatePoints } from '../utils/points';
import { v4 as uuidv4 } from 'uuid';

let receipts: Record<string, Receipt> = {};

export const processReceipt = async (receiptData: Receipt) => {
  try {
    logger.debug('Started processing receipt', receiptData);
    
    const id = uuidv4();
    const points = calculatePoints(receiptData);
    
    // Add points to receiptData
    const receipt: Receipt = { ...receiptData, points };

    receipts[id] = receipt;

    logger.info(`Receipt processed successfully with ID: ${id}`);
    return { id };
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error processing receipt: ${err.message}`);
      throw new Error('Error processing receipt');
    } else {
      logger.error('Unknown error occurred');
      throw new Error('Unknown error processing receipt');
    }
  }
};

export const getReceipt = async (id: string): Promise<Receipt | undefined> => {
  try {
    logger.debug(`Fetching receipt with ID: ${id}`);
    return receipts[id];
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error fetching receipt: ${err.message}`);
      throw new Error('Error fetching receipt');
    } else {
      logger.error('Unknown error occurred');
      throw new Error('Unknown error fetching receipt');
    }
  }
};
