import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function checkBefore(userId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

  const statusAceitavel = 'PAID';

  const userTicket = await ticketRepository.getTicket(userEnrollment.id);
  if (!userTicket) throw notFoundError();
  if (userTicket.status !== statusAceitavel) throw paymentRequiredError();
  if (!userTicket.TicketType.includesHotel || userTicket.TicketType.isRemote) throw paymentRequiredError();

  return;
}

async function getAllHotels(userId: number) {
  await checkBefore(userId);
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
