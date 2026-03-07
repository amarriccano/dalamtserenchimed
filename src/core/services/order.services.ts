import { Order } from '../model/Order.js';
import { BookService } from './book.services.js';

export const OrderService = {
  getAllOrders: async () => {
    return await Order.find().sort({ createdAt: -1 });
  },

  getOrderById: async (id: string) => {
    const order = await Order.findById(id);
    if (!order) return null;

    const orderObj = order.toObject();

    const itemsWithDetails = await Promise.all(
      orderObj.items.map(async (item: any) => {
        const realBookId = item.bookId.split('_')[0];
        const bookDetails = await BookService.getBookById(realBookId);
        return {
          ...item,
          bookDetails
        };
      })
    );

    return {
      ...orderObj,
      items: itemsWithDetails
    };
  },

  createOrder: async (data: any) => {
    const { items } = data;

    for (const item of items) {
      const bookId = item.bookId
      const bookVariant = item.variant
      const book = await BookService.getBookById(bookId);

      if (!book) {
        throw new Error(`Book not found: ${bookId}`);
      }

      const variant = book.variants.find((v: any) => v.format === bookVariant);

      if (!variant) {
        throw new Error(`Format ${bookVariant} not available for ${book.title}`);
      }

      if (variant.price !== item.price) {
        throw new Error(`Price mismatch for ${item.title}`);
      }
    }

    const order = new Order(data);
    return await order.save();
  },

  updateOrderStatus: async (id: string, status: string) => {
    return await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  },

  deleteOrder: async (id: string) => {
    return await Order.findByIdAndDelete(id);
  }
};