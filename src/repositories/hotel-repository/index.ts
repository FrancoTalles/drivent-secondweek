import { prisma } from '@/config';

async function getAllHotels() {
  return await prisma.hotel.findMany();
}

async function getHotel(hotelId: number) {
  return await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  getAllHotels,
  getHotel,
};

export default hotelsRepository;
