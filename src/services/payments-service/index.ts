import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function findPayment(userId: number, ticketId: number) {
  if (!ticketId) throw invalidDataError(['tickedId Invalid']);

  const userTicket = await ticketRepository.getTicketForPayment(ticketId);
  if (!userTicket) throw notFoundError();

  const enrollmentUser = userTicket.Enrollment.userId;
  if (enrollmentUser !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsServices = {
  findPayment,
};

export default paymentsServices;
