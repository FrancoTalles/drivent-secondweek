import { TicketType, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypes() {
  return await prisma.ticketType.findMany();
}

const ticketRepository = {
  getAllTypes,
};

export default ticketRepository;
