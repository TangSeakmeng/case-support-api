import { Request, Response, Router } from 'express';
import { Brand } from '../entity/Brand.entity';
import { v4 as uuidv4 } from 'uuid';
import { Branch_product } from '../entity/Branch_product.entity';
import { BranchProductService } from '../services/branchProductService.service';
const branchProductRouter = Router();
const branchProductService = new BranchProductService();

// api/branchProduct -GET

branchProductRouter.get('', async (req: Request, res: Response) => {
  try {
    const branch_products = await branchProductService.getAllBranchProducts();
    res.status(200).send(branch_products);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/branch_product/create - POST
branchProductRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const branch_product = {
      branch: req.body.branch,
      product: req.body.product,
      unit_instock: req.body.unit_instock,
      cost_of_sale: req.body.cost_of_sale,
      sale_price: req.body.sale_price
    };
    const insertBranchProduct: Branch_product = Branch_product.create(branch_product);
    const result = await insertBranchProduct.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default branchProductRouter;