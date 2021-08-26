import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Purchase_order } from '../entity/Purchase_order.entity';
import { Purchase_orderService } from '../services/purchase_orderService.service';
const purchase_orderRouter = Router();
const purchase_orderService = new Purchase_orderService();

// api/purchaseOrder -GET

purchase_orderRouter.get('', async (req: Request, res: Response) => {
  try {
    const purchase_orders = await purchase_orderService.getAllPurchase_orders();
    res.status(200).send(purchase_orders);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/purchaseOrder/create - POST
purchase_orderRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const purchase_order = {
      id: uuidv4(),
      supplier_id: req.body.supplier_id,
      subtotal: req.body.subtotal,
      purchase_Date: new Date(),
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    };
    const insertPurchase_order: Purchase_order = Purchase_order.create(purchase_order);
    const result = await insertPurchase_order.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default purchase_orderRouter;