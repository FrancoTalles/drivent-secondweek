import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsServices from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query as Record<string, string>;
  const { userId } = req;
  const ticketIdNumber = parseInt(ticketId);

  try {
    const payment = await paymentsServices.findPayment(userId, ticketIdNumber);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
