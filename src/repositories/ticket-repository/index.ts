import { TicketType, Ticket } from '@prisma/client';
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

const ticketRepository = {
  getAllTypes,
  getTicket,
  create,
};

export default ticketRepository;
