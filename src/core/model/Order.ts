import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    bookId: { type: String, required: true }, // Format: "ID_format"
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', OrderSchema);