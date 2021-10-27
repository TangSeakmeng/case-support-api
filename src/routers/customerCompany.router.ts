import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import auth from '../middlewares/auth';
import { CustomerCompany } from '../entity/CustomerCompany.entity';
import { CustomerCompanyService } from '../services/customerCompany.service';

const router = Router();
const customerCompanyService = new CustomerCompanyService();

// usage: get all customer companies
// route: /api/customerCompanies - GET
router.get('', async (req: Request, res: Response) => {
  try {
    const users = await customerCompanyService.getCustomerCompanies();
    res.status(201).send(users);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: get all customer company by id
// route: /api/customerCompanies/1 - GET
router.get('/:companyId', auth, async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const user = await customerCompanyService.getCustomerCompany(companyId);
    res.status(201).send(user);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: create customer company
// route: /api/customerCompanies - POST
router.post('',auth, async (req: Request, res: Response) => {
  try {
    const company = {
      id: req.body.id || uuidv4(),
      name: req.body.name,
      description: req.body.description,
      isPublished: true,
      isDeleted: false,
      logoDownloadUrl: req.body.logoDownloadUrl,
      logoFilePath: req.body.logoFilePath,
      createdDate: new Date(),
      updatedDate: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    } as CustomerCompany;

    const insertCustomerCompany: CustomerCompany = CustomerCompany.create(company);
    const result = await insertCustomerCompany.save();

    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

// usage: update customer company
// route: /api/customerCompanies - PUT
router.put('', async (req: Request, res: Response) => {
  try {
    const customerCompanyId = req.body.id;
    const customerCompany: CustomerCompany = await customerCompanyService.getCustomerCompany(customerCompanyId);

    if (!customerCompany) return res.status(404).json({error: 'customer company not found'})

    customerCompany.name = req.body.username;
    customerCompany.description = req.body.email;
    await customerCompany.save();

    return res.status(201).json(customerCompany);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: delete customer company
// route: /api/customerCompanies - DELETE
router.delete('', async (req: Request, res: Response) => {
  try {
    const customerCompanyId = req.body.id;
    const customerCompany: CustomerCompany = await customerCompanyService.getCustomerCompany(customerCompanyId);

    if (!customerCompany) return res.status(404).json({error: 'customer company not found'})

    customerCompany.isPublished = false;
    customerCompany.isDeleted = true;
    await customerCompany.save();

    return res.status(201).json(customerCompany);
  } catch (error) {
    res.status(501).send(error);
  }
});

export default router;