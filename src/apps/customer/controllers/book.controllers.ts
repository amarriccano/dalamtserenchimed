import { type Request, type Response } from 'express';
import { BookService } from '../../../core/services/book.services.js';
import { type BookParams } from '../../../core/validation/book.schema.js'

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookById = async (req: Request<BookParams>, res: Response) => {
  try {
    const { id } = req.params;
    const book = await BookService.getBookById(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};