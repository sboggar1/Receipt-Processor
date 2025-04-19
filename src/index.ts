import express from 'express';
import { logger } from './utils/logger';
import receiptRoutes from './routes/receipt.routes';
import { logRequest } from './middleware/request-logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logRequest);  // Log every request

app.use('/receipts', receiptRoutes);

app.listen(PORT, () => {
  logger.info(`Server started on http://localhost:${PORT}`);
});
