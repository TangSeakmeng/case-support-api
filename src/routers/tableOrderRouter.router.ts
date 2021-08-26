import { Request, Response, Router } from 'express';
import { TableOrder } from '../entity/TableOrder.entity'; 
import { TableOrderService } from '../services/TableOrderService.service';
const tableOrderRouter = Router();
const tableOrderService = new TableOrderService();

// api/tableOrder -GET

tableOrderRouter.get('', async (req: Request, res: Response) => {
    try {
      const tableOrders = await tableOrderService.getAllTableOrders();
      res.status(200).send(tableOrders);
    } catch (error) {
      res.status(501).send(error);
    }
  });
  
  // /api/tableOrder/create - POST
  tableOrderRouter.post('/create', async (req: Request, res: Response) => {
    try {
  
      const tableOrder = {
        table: req.body.table,
        order: req.body.order,
        checkin_time: new Date(),
        status: req.body.status
      };
      const inserttableOrder: TableOrder = TableOrder.create(tableOrder);
      const result = await inserttableOrder.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(501).json(error);
    }
  });
  
  export default tableOrderRouter;