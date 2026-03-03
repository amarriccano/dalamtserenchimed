import { Router } from 'express';
import * as BookController from '../controllers/book.controllers.js';
import { validate } from '../../../core/middleware/validate.js';
import { 
  CreateBookSchema, 
  UpdateBookSchema, 
  GetBookSchema 
} from '../../../core/validation/book.schema.js';

const router = Router();

router.get('/', BookController.getBooks);

router.get('/:id',
  validate(GetBookSchema), 
  BookController.getBookById
);

export default router;