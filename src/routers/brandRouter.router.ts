import { Request, Response, Router } from 'express';
import { Brand } from '../entity/Brand.entity';
import { v4 as uuidv4 } from 'uuid';
import { BrandService } from '../services/brandService.service';
const brandRouter = Router();
const brandService = new BrandService();

// api/brand -GET

brandRouter.get('', async (req: Request, res: Response) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).send(brands);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/brand/create - POST
brandRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const brand = {
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
      updatedBy: req.body.updatedBy
    };
    const insertbrand: Brand = Brand.create(brand);
    const result = await insertbrand.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default brandRouter;