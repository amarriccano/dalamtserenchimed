import { z } from 'zod';
import { Types } from 'mongoose';

const MongoIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid MongoDB ID format",
});

const VariantSchema = z.object({
  format: z.enum(['hardcover', 'paperback', 'ebook', 'audiobook']),
  isbn: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  status: z.enum(['available', 'soldout']),
  sku: z.string().optional(),
});

export const CreateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").trim(),
    author: z.string().min(1, "Author is required"),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    variants: z.array(VariantSchema).min(1, "At least one variant is required"), 
    order: z.number().optional(),
  }),
});

export const GetBookSchema = z.object({
  params: z.object({
    id: MongoIdSchema,
  }),
});

export const UpdateBookSchema = z.object({
  params: z.object({
    id: MongoIdSchema,
  }),
  body: CreateBookSchema.shape.body.partial(),
});

export type CreateBookInput = z.infer<typeof CreateBookSchema>['body'];
export type UpdateBookInput = z.infer<typeof UpdateBookSchema>['body'];
export type BookParams = z.infer<typeof GetBookSchema>['params'];