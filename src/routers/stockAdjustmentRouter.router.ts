import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StockAdjustmentService } from '../services/stockAdjustmentService.service';
import { StockAdjustment } from '../entity/StockAdjustment.entity';
const stockAdjustmentRouter = Router();
const stockAdjustmentService = new StockAdjustmentService();

// api/stockAdjustment -GET

stockAdjustmentRouter.get('', async (req: Request, res: Response) => {
  try {
    const stockAdjustments = await stockAdjustmentService.getAllStockAdjustments();
    res.status(200).send(stockAdjustments);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/stockAdjustment/create - POST
stockAdjustmentRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const stockAdjustment = {
        id: uuidv4(),
        total_adjustment:req.body.total_adjustment,
        created_Date: new Date(),
        updated_Date: new Date(),
        is_published: req.body.is_published,
        is_deleted: req.body.is_deleted,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy

    };
    const InsertStockAdjustment: StockAdjustment = StockAdjustment.create(stockAdjustment);
    const result = await InsertStockAdjustment.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default stockAdjustmentRouter;