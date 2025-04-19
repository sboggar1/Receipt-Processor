import { Router } from 'express';
import { logger } from '../utils/logger';
import { validateReceipt } from '../validators/receipt.validator';
import { processReceipt, getReceipt } from '../services/receipt.service';

const router = Router();

router.post('/process', async (req, res) => {
  logger.debug('Processing receipt request', req.body);

  const { error } = validateReceipt(req.body);
  if (error) {
    logger.error(`Validation failed: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const receipt = await processReceipt(req.body);
    logger.info(`Receipt processed successfully, ID: ${receipt.id}`);
    return res.status(201).json({ id: receipt.id });
  } catch (err: unknown) { 
    if (err instanceof Error) { 
      logger.error(`Error processing receipt: ${err.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      logger.error('Unknown error occurred');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

router.get('/:id/points', async (req, res) => {
  const { id } = req.params;
  logger.debug(`Fetching points for receipt ID: ${id}`);

  try {
    const receipt = await getReceipt(id);
    if (!receipt) {
      logger.warn(`Receipt not found for ID: ${id}`);
      return res.status(404).json({ error: 'Receipt not found' });
    }

    const points = receipt.points;
    logger.info(`Points for receipt ID ${id}: ${points}`);
    return res.status(200).json({ points });
  } catch (err: unknown) {  // Explicitly cast err to 'unknown'
    if (err instanceof Error) {  // Check if it's an instance of Error
      logger.error(`Error retrieving receipt points: ${err.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      logger.error('Unknown error occurred');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

export default router;
