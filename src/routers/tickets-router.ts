import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket, getAllTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTypes).get('/', getTicket);

export { ticketsRouter };
