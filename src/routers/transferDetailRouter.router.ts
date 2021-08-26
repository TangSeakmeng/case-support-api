import { Request, Response, Router } from 'express';
import { Transfer_detail } from '../entity/Transfer_detail.entity';
import { Transfer_detailService } from '../services/Transfer_detailService.service';
const transfer_detailRouter = Router();
const transfer_detailService = new Transfer_detailService();

// api/transfer_detail -GET

transfer_detailRouter.get('', async (req: Request, res: Response) => {
  try {
    const transfer_details = await transfer_detailService.getAllTransfer_details();
    res.status(200).send(transfer_details);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/transfer_detail/create - POST
transfer_detailRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const transfer_detail = {
      product: req.body.product,
      transfer_product: req.body.transfer_product,
      qty: req.body.qty,
      price: req.body.price
    };
    const insertTransfer_detail: Transfer_detail = Transfer_detail.create(transfer_detail);
    const result = await insertTransfer_detail.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default transfer_detailRouter;