import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(roomId: number, userId: number) {
  const ticket = await bookingRepository.findTicket(userId);

  if (!ticket.Ticket[0] || !ticket) throw forbiddenError('User has no enrollment or ticket');

  if (ticket.Ticket[0].status !== 'PAID') throw forbiddenError("User hasn't paid the ticket yet");
  if (!ticket.Ticket[0].TicketType.includesHotel) throw forbiddenError("Ticket doesn't include hotel");
  if (ticket.Ticket[0].TicketType.isRemote) throw forbiddenError('Ticket is remote');

  const room = await bookingRepository.findRoom(roomId);

  if (!room) throw notFoundError();
  if (room.Booking.length >= room.capacity) throw forbiddenError('No vacancies');

  const booking = await bookingRepository.create(roomId, userId);

  return booking;
}

const bookingService = {
  getBooking,
  createBooking,
};

export default bookingService;
