import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { CheckPayment } from '@/protocols';

async function findPayment(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function create(paymentData: CheckPayment) {
  return await prisma.payment.create({
    data: paymentData,
  });
}

const paymentRepository = {
  findPayment,
  create,
};

export default paymentRepository;
