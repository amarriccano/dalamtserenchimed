import { Router } from 'express';
import * as OrderController from '../controllers/order.controllers.js';
import { validate } from '../../../core/middleware/validate.js';
import { 
  CreateOrderSchema
} from '../../../core/validation/order.schema.js';

const router = Router();

router.post('/', 
  validate(CreateOrderSchema), 
  OrderController.createOrder
);


export default router;