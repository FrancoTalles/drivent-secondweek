import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketRepository.getAllTypes();
  return ticketsTypes;
}

const ticketsService = {
  getAllTicketsTypes,
};

export default ticketsService;
