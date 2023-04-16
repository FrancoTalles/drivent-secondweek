import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPayment, makePayment } from '@/controllers/payments-controller';
import { PaymentBody } from '@/schemas/payment-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPayment)
  .post('/process', validateBody(PaymentBody), makePayment);

export { paymentsRouter };
