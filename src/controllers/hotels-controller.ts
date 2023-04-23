import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const allHotels = await hotelsService.getAllHotels(userId);
    return res.status(httpStatus.OK).send(allHotels);
  } catch (error) {
    next(error);
  }
}
