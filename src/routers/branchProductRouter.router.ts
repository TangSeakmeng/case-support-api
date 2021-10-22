import { Request, Response, Router } from 'express';
import { Brand } from '../entity/Brand.entity';
import { v4 as uuidv4 } from 'uuid';
import { Branch_product } from '../entity/Branch_product.entity';
import { BranchProductService } from '../services/branchProductService.service';
import { getConnection } from 'typeorm';
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

//api/branchProduct/branch/:branchId - get by branch id

branchProductRouter.get('/branch/:branchId/:pageNumber/:pageSize', async ( req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const pageNumber = req.params.pageNumber;
    const pageSize = req.params.pageSize;
    const branch_products = await branchProductService.getBranchProducts(branchId, pageNumber, pageSize)
    res.status(200).send(branch_products);
  } catch (error) {
    res.status(501).send(error);
  }
});

//api/branchProduct/:branch/:categoryId/byCat -- get by branchId and cateId
branchProductRouter.get('/:branchId/:categoryId/byCat', async ( req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const categoryId = req.params.categoryId;
    const branch_products = await branchProductService.getBranchProductbyCategoryId(branchId,categoryId)
    res.status(200).send(branch_products);
  } catch (error) {
    res.status(501).send(error);
  }
});

//api/branchProduct/:branch/:productId -- get by branchId and productId
branchProductRouter.get('/:branchId/:productId/byProductId', async ( req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const productId = req.params.productId;
    const branch_products = await branchProductService.getBranchProductbyId(branchId,productId)
    res.status(200).send(branch_products);
  } catch (error) {
    res.status(501).send(error);
  }
});


// /api/branchProduct/create - POST
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

//api/branchProduct/:branchId/:productId/update --update by id
// branchProductRouter.put('/:branchId/:productId/update', async (req: Request, res: Response) => {
//   try {
    
    // const branch_products = await getConnection()
    // .createQueryBuilder()
    // .update(Branch_product)
    // .set({ 
    //   unit_instock: req.body.unit_instock,
    //   cost_of_sale: req.body.cost_of_sale,
    //   sale_price: req.body.sale_price
    // })
    // .where("branch = :branchId, product = :productId", 
    // { 
    //   branchId: req.params.branchId,
    //   productId: req.params.productId 
    // })
    // .execute();
    // console.log(branch_products)
    // return res.status(200).json(branch_products);
    
//   } catch (error) {
//     res.status(501).send(error);
//   }
// });

branchProductRouter.put('/:branchId/:productId/update', async (req: Request, res: Response) => {
  try {
    
    const unit_instock = req.body.unit_instock;
    const cost_of_sale = req.body.cost_of_sale;
    const branchId = req.params.branchId;
    const productId = req.params.productId;
    const sale_price = req.body.sale_price
    const branch_products = await branchProductService.getBranchProductbyId(branchId, productId)
    if (!branch_products) {
      return res.status(404).json({error: 'product not found'})
    }

    if(req.body === undefined){
      res.statusMessage = "please send a valid body to update record";
      res.statusCode = 400;
      res.end();
      return
    }
    const update_products = await Branch_product
    .query ("UPDATE branch_product SET unit_instock = $1, cost_of_sale = $2, sale_price = $3 WHERE \"branchId\"= $4 AND \"productId\" = $5",[unit_instock,cost_of_sale,sale_price ,branchId,productId ])
    const result = await branchProductService.getBranchProductbyId(branchId, productId)
    if (result.length === 0)
    res.status(404).json('null')
    if (result.length === 1)
    res.status(200).json(result[0])
    
  } catch (error) {
    res.status(501).send(error);
  }
});

export default branchProductRouter;