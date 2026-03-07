import { Router } from 'express';
import bookRoutes from './routes/book.routes.js';
import orderRoutes from './routes/order.routes.js'

const customerRouter = Router();

customerRouter.use('/books', bookRoutes);
customerRouter.use('/orders', orderRoutes);

export default customerRouter;