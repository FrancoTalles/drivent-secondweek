import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const roomId = req.body.roomId as number;
  const { userId } = req;

  try {
    const booking = await bookingService.createBooking(roomId, userId);

    const data = {
      bookingId: booking.id,
    };

    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const roomId = req.body.roomId as number;
  const { bookingId } = req.params as Record<string, string>;
  const { userId } = req;

  try {
    const updateBooking = await bookingService.updateBooking(roomId, Number(bookingId), userId);

    const data = {
      bookingId: updateBooking.id,
    };

    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    next(error);
  }
}
