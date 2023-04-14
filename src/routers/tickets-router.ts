import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTypes);

export { ticketsRouter };
