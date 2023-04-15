import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

async function getAllTicketsTypes() {
  const ticketsTypes = await ticketRepository.getAllTypes();
  return ticketsTypes;
}

async function getUserTicket(id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(id);
  if (!enrollment) throw notFoundError();

  const userTicket = await ticketRepository.getTicket(enrollment.id);
  if (!userTicket) throw notFoundError();

  return userTicket;
}

const ticketsService = {
  getAllTicketsTypes,
  getUserTicket,
};

export default ticketsService;
