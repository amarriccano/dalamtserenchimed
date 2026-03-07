import { type Request, type Response } from 'express';
import { OrderService } from '../../../core/services/order.services.js';
import { sendOrderNotification } from '../../../core/utils/mailer.js';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await OrderService.createOrder(req.body);
    console.log("new order: ", newOrder)
    sendOrderNotification(newOrder).catch(err =>
      console.error('Mail failed:', err)
    )
    
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};