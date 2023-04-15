import { TicketType, Ticket } from '@prisma/client';
import { prisma } from '@/config';

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

const ticketRepository = {
  getAllTypes,
  getTicket,
};

export default ticketRepository;
