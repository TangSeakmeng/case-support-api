import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetail } from '../entity/OrderDetail.entity'; 
import { OrderDetailService } from '../services/OrderDetailService.service';
const orderDetailRouter = Router();
const orderDetailService = new OrderDetailService();

// api/orderDetail -GET

orderDetailRouter.get('', async (req: Request, res: Response) => {
    try {
      const orderDetails = await orderDetailService.getAllOrderDetails();
      res.status(200).send(orderDetails);
    } catch (error) {
      res.status(501).send(error);
    }
  });
  
  // /api/orderDetail/create - POST
  orderDetailRouter.post('/create', async (req: Request, res: Response) => {
    try {
  
      const orderDetail = {
        order: req.body.order,
        menu: req.body.menu,
        qty: req.body.qty,
        price: req.body.price
      };
      const insertOrderDetail: OrderDetail = OrderDetail.create(orderDetail);
      const result = await insertOrderDetail.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(501).json(error);
    }
  });
  
  export default orderDetailRouter;