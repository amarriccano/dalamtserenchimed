import { Router } from 'express';
import bookRoutes from './routes/book.routes.js';
// import userRoutes from './routes/user.routes';

const adminRouter = Router();

// Mount individual model routes
adminRouter.use('/books', bookRoutes);
// adminRouter.use('/users', userRoutes);

export default adminRouter;