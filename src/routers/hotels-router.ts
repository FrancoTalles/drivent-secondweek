import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken);

export { hotelsRouter };
