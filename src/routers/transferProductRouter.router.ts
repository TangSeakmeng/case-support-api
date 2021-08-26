import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TransferProductService } from '../services/transferproductService.service';
import { Transfer_product } from '../entity/Transfer_product.entity';
const transferProductRouter = Router();
const transferProductService = new TransferProductService();

// api/transferProduct -GET

transferProductRouter.get('', async (req: Request, res: Response) => {
  try {
    const transfer_products = await transferProductService.getAllTransferProducts();
    res.status(200).send(transfer_products);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/transferproduct/create - POST
transferProductRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const transfer_product = {
        id: uuidv4(),
        transfer_date: new Date(),
        from_branch_id: req.body.from_branch_id,
        to_branch_id: req.body.to_branch_id,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy

    };
    const InsertTransferProduct: Transfer_product = Transfer_product.create(transfer_product);
    const result = await InsertTransferProduct.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default transferProductRouter;