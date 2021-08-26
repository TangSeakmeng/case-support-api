import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../entity/Order.entity';
import { OrderService } from '../services/orderService.service';
const orderRouter = Router();
const orderService = new OrderService();

// api/order -GET

orderRouter.get('', async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/order/create - POST
orderRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const order = {
      id: uuidv4(),
      customerName: req.body.customerName,
      customerContact: req.body.customerContact,
      subtotal: req.body.subtotal,
      address: req.body.address,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      order_status_id: req.body.order_status_id
    };
    const insertOrder: Order = Order.create(order);
    const result = await insertOrder.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default orderRouter;