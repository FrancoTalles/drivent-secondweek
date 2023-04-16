import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsServices from '@/services/payments-service';
import { PaymentBody, PaymentFinal } from '@/protocols';

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

export async function makePayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const dataPayment = req.body as PaymentBody;
  const PaymentFinal: PaymentFinal = { userId, ticketId: dataPayment.ticketId, cardData: dataPayment.cardData };
  try {
    const makeAPayment = await paymentsServices.makePayment(PaymentFinal);

    return res.status(httpStatus.OK).send(makeAPayment);
  } catch (error) {
    next(error);
  }
}
