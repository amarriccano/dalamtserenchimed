import mongoose, { Schema, Document } from 'mongoose';

export interface IVariant {
  format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  isbn?: string;
  price: number;
  status: 'available' | 'soldout';
  sku?: string;
}

export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  year?: number;
  pages?: number;
  publisher?: string;
  category?: 'History';
  language: 'Монгол' | 'English';
  variants: IVariant[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema({
    format: { 
        type: String, 
        enum: ['hardcover', 'paperback', 'ebook', 'audiobook'], 
        required: true 
    },
    isbn: { type: String, sparse: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'soldout'], required: true },
    sku: { type: String }
});

const BookSchema = new Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    description: String,
    coverImage: String,
    year: Number,
    pages: Number,
    publisher: String,
    category: { type: String, enum: ['History'] },
    language: { type: String, enum: ['Монгол', 'English']},
    variants: {
        type: [VariantSchema],
        validate: {
            validator: function(v: any[]) {
                return v && v.length > 0;
            },
            message: 'Алдаа #7625781'
        }
    }, 
    order: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Book = mongoose.model<IBook>('Book', BookSchema);