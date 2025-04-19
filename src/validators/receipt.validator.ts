import Joi from 'joi';
import { logger } from '../utils/logger';

export const validateReceipt = (receipt: any) => {
  const schema = Joi.object({
    retailer: Joi.string().required(),
    purchaseDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    purchaseTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    total: Joi.number().greater(0).required(),
    items: Joi.array().items(Joi.object({
      shortDescription: Joi.string().required(),
      price: Joi.string().required(),
    })).min(1).required(),
  });

  const result = schema.validate(receipt);
  if (result.error) {
    logger.error(`Validation error: ${result.error.details[0].message}`);
  }
  return result;
};
