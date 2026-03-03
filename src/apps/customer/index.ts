import { Router } from 'express';
import bookRoutes from './routes/book.routes.js';

const customerRouter = Router();

// Mount individual model routes
customerRouter.use('/books', bookRoutes);

export default customerRouter;