import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getAllTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypesArray = await ticketsService.getAllTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypesArray);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
