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

router.post('/', 
  validate(CreateBookSchema), 
  BookController.createBook
);

router.patch('/:id', 
  validate(UpdateBookSchema), 
  BookController.updateBook
);

router.delete('/:id', 
  validate(GetBookSchema), 
  BookController.deleteBook
);

export default router;