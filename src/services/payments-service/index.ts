import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { CheckPayment, PaymentFinal } from '@/protocols';
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

async function makePayment(params: PaymentFinal) {
  const userTicket = await ticketRepository.getTicketForPayment(params.ticketId);
  if (!userTicket) throw notFoundError();

  const enrollmentUser = userTicket.Enrollment.userId;
  if (enrollmentUser !== params.userId) throw unauthorizedError();

  const ticketInformation = await ticketRepository.getTicket(userTicket.enrollmentId);

  const paymentCheck: CheckPayment = {
    ticketId: params.ticketId,
    value: ticketInformation.TicketType.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: params.cardData.number.toString().slice(-4),
  };

  const createPayment = await paymentRepository.create(paymentCheck);
  const updateTicket = await ticketRepository.updateStatus(userTicket.id);

  return createPayment;
}

const paymentsServices = {
  findPayment,
  makePayment,
};

export default paymentsServices;
