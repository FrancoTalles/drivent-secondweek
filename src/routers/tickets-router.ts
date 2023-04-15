import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket, getAllTypes, createTicket } from '@/controllers/tickets-controller';
import { ticketTypeIdValidationSchema } from '@/schemas/ticket-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTypes)
  .get('/', getTicket)
  .post('/', validateBody(ticketTypeIdValidationSchema), createTicket);

export { ticketsRouter };
