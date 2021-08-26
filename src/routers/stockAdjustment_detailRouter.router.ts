import { Request, Response, Router } from 'express';
import { StockAdjustment_detail } from '../entity/StockAdjustment_detail.entity';
import { StockAdjustment_detailService } from '../services/stockAdjustment_detailService.service';
const stockAdjustment_detailRouter = Router();
const stockAdjustment_detailService = new StockAdjustment_detailService();

// api/stockAdjustment_detail -GET

stockAdjustment_detailRouter.get('', async (req: Request, res: Response) => {
  try {
    const stockAdjustment_details = await stockAdjustment_detailService.getAllStockAdjustment_details();
    res.status(200).send(stockAdjustment_details);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/stockAdjustment_detail/create - POST
stockAdjustment_detailRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const stockAdjustment_detail = {
      product: req.body.product,
      stockAdjustment: req.body.stockAdjustment,
      description: req.body.description,
      qty: req.body.qty,
      cos_of_good_sold: req.body.cos_of_good_sold
    };
    const insertStockAdjustment_detail: StockAdjustment_detail = StockAdjustment_detail.create(stockAdjustment_detail);
    const result = await insertStockAdjustment_detail.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default stockAdjustment_detailRouter;