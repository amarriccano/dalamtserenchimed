import { Book, type IBook } from '../model/Book.js';
import { type CreateBookInput } from '../validation/book.schema.js';

export const BookService = {
  getAllBooks: async () => {
    return await Book.find().sort({ order: 1 });
  },

  getBookById: async (id: string) => {
    return await Book.findById(id);
  },

  createBook: async (data: CreateBookInput) => {
    const book = new Book(data);
    return await book.save();
  },

  createBooksBulk: async (booksData: any[]) => {
    return await Book.insertMany(booksData, { ordered: true });
  },

  updateBook: async (id: string, data: Partial<IBook>) => {
    return await Book.findByIdAndUpdate(id, data, { 
      new: true, 
      runValidators: true 
    });
  },

  deleteBook: async (id: string) => {
    return await Book.findByIdAndDelete(id);
  }


};