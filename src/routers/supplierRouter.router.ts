import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { SupplierService } from '../services/SupplierService.service';
import { Supplier } from '../entity/supplier.entity';
const supplierRouter = Router();
const supplierService = new SupplierService();

// api/supplier -GET

supplierRouter.get('', async (req: Request, res: Response) => {
  try {
    const suppliers = await supplierService.getAllsupplierServices();
    res.status(200).send(suppliers);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/supplier/create - POST
supplierRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const supplier = {
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact

    };
    const InsertSupplier: Supplier = Supplier.create(supplier);
    const result = await InsertSupplier.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default supplierRouter;