import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ProductService } from '../services/productService.service';
import { Product } from '../entity/Product.entity';
const productRouter = Router();
const productService = new ProductService();

// api/product -GET

productRouter.get('', async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/product/create - POST
productRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const product = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      imageDownloadUrl: req.body.imageDownloadUrl,
      imageFilePath: req.body.imageFilePath,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      product_brand_id: req.body.product_brand_id,
      product_category_id: req.body.product_category_id,
    };
    const insertProduct: Product = Product.create(product);
    const result = await insertProduct.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default productRouter;