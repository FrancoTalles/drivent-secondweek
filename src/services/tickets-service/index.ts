import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import { TicketParams } from '@/protocols';

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

async function createTicket(params: TicketParams) {
  const { userId, ticketTypeId, status } = params;

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const enrollmentId = enrollment.id;
  const newTicket = await ticketRepository.create({ ticketTypeId, status, enrollmentId });

  return newTicket;
}

const ticketsService = {
  getAllTicketsTypes,
  getUserTicket,
  createTicket,
};

export default ticketsService;
