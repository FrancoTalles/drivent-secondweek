import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function checkBefore(userId: number) {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

  const statusAceitavel = 'PAID';

  const userTicket = await ticketRepository.getTicket(userEnrollment.id);
  if (!userTicket) throw notFoundError();
  if (!userTicket.TicketType.includesHotel || userTicket.TicketType.isRemote) throw paymentRequiredError();
  if (userTicket.status !== statusAceitavel) throw paymentRequiredError();
  return;
}

async function getAllHotels(userId: number) {
  await checkBefore(userId);

  const allHotels = await hotelsRepository.getAllHotels();
  if (allHotels.length === 0) throw notFoundError();

  return allHotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
