import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { TicketParams } from '@/protocols';

export async function getAllTypes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const ticketTypesArray = await ticketsService.getAllTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypesArray);
  } catch (error) {
    next(error);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const userTicket = await ticketsService.getUserTicket(userId);
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    next(error);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  const data: TicketParams = {
    userId,
    ticketTypeId,
    status: 'RESERVED',
  };

  try {
    const createTicket = await ticketsService.createTicket(data);
    return res.status(httpStatus.CREATED).send(createTicket);
  } catch (error) {
    next(error);
  }
}
