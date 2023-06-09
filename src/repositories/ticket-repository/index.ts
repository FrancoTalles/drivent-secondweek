import { prisma } from '@/config';
import { TicketParamsRepository } from '@/protocols';

async function getAllTypes() {
  return await prisma.ticketType.findMany();
}

async function getTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function create(params: TicketParamsRepository) {
  const { ticketTypeId, enrollmentId, status } = params;

  const data = {
    ticketTypeId,
    enrollmentId,
    status,
  };

  return await prisma.ticket.create({
    data,
    include: {
      TicketType: true,
    },
  });
}

async function getTicketForPayment(tickedId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: tickedId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function updateStatus(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: {
      status: 'PAID',
    },
  });
}

const ticketRepository = {
  getAllTypes,
  getTicket,
  create,
  getTicketForPayment,
  updateStatus,
};

export default ticketRepository;
