import { prisma } from '@/config';

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findTicket(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });
}

async function findRoom(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      Booking: true,
    },
  });
}

async function create(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

const bookingRepository = {
  getBooking,
  findTicket,
  findRoom,
  create,
};

export default bookingRepository;
