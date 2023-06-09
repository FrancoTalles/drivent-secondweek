import { prisma } from '@/config';

export function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}
