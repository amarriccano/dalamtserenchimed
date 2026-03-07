import { z } from 'zod';

const OrderItemVariantSchema = z.object({
  format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook']),
  isbn: z.string().optional(),
  price: z.number().positive(),
  sku: z.string().optional(),
});

const OrderItemSchema = z.object({
  bookId: z.string().min(1, "bookId is required"),
  title: z.string().min(1, "Title is required"),
  variant: OrderItemVariantSchema,
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const CreateOrderSchema = z.object({
  body: z.object({
    customerName: z.string().min(1, "Customer name is required").trim(),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    notes: z.string().optional(),
    items: z.array(OrderItemSchema).min(1, "At least one item is required"),
    total: z.number().positive("Total must be positive"),
  }),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>['body'];