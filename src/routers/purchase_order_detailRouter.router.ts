import { Request, Response, Router } from 'express';
import { Purchase_order_detail } from '../entity/Purchase_order_detail.entity';
import { Purchase_order_detailService } from '../services/Purchase_order_detailService.service';
const purchase_order_detailRouter = Router();
const purchase_order_detailService = new Purchase_order_detailService();

// api/purchaseOrder_detail -GET

purchase_order_detailRouter.get('', async (req: Request, res: Response) => {
  try {
    const purchase_order_details = await purchase_order_detailService.getAllPurchase_order_details();
    res.status(200).send(purchase_order_details);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/purchaseOrder_detail/create - POST
purchase_order_detailRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const purchase_order_detail = {
      product: req.body.product,
      purchase_order: req.body.purchase_order,
      qty: req.body.qty,
      price: req.body.price
    };
    const insertPurchase_order_detail: Purchase_order_detail = Purchase_order_detail.create(purchase_order_detail);
    const result = await insertPurchase_order_detail.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default purchase_order_detailRouter;