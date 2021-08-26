import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../entity/OrderStatus.entity';
import { OrderStatusService } from '../services/orderStatusService.service';
const orderStatusRouter = Router();
const orderStatusService = new OrderStatusService();

// api/orderStatus -GET

orderStatusRouter.get('', async (req: Request, res: Response) => {
  try {
    const allorderStatus = await orderStatusService.getAllOrderStatus();
    res.status(200).send(allorderStatus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/orderStatus/create - POST
orderStatusRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const orderStatus = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      order_Number: req.body.order_Number,
    };
    const insertOrderStatus: OrderStatus = OrderStatus.create(orderStatus);
    const result = await insertOrderStatus.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default orderStatusRouter;