import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import auth from '../middlewares/auth';
import { CustomerDepartment } from '../entity/CustomerDepartment.entity';
import { CustomerDepartmentService } from '../services/customerDepartment.service';

const router = Router();
const customerDepartmentService = new CustomerDepartmentService();

// usage: get all customer departments
// route: /api/customerDepartments - GET
router.get('', async (req: Request, res: Response) => {
  try {
    const departments = await customerDepartmentService.getCustomerDepartments();
    res.status(201).send(departments);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: get all customer department by id
// route: /api/customerDepartments/1 - GET
router.get('/:departmentId', auth, async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await customerDepartmentService.getCustomerDepartment(departmentId);
    res.status(201).send(department);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: get all customer departments by customer companyId
// route: /api/customerDepartments/1/companyId - GET
router.get('/:companyId/companyId', auth, async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const departments = await customerDepartmentService.getCustomerDepartmentsByCompanyId(companyId);
    res.status(201).send(departments);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: create customer department
// route: /api/customerDepartments - POST
router.post('',auth, async (req: Request, res: Response) => {
  try {
    const company = {
      id: req.body.id || uuidv4(),
      name: req.body.name,
      description: req.body.description,
      customerCompany: req.body.customerCompany,
      isPublished: true,
      isDeleted: false,
      logoDownloadUrl: req.body.logoDownloadUrl || null,
      logoFilePath: req.body.logoFilePath || null,
      createdDate: new Date(),
      updatedDate: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    } as CustomerDepartment;

    const insertCustomerDepartment: CustomerDepartment = CustomerDepartment.create(company);
    const result = await insertCustomerDepartment.save();

    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

// usage: update customer department
// route: /api/customerDepartments - PUT
router.put('', async (req: Request, res: Response) => {
  try {
    const customerDepartmentId = req.body.id;
    const customerDepartment: CustomerDepartment = await customerDepartmentService.getCustomerDepartment(customerDepartmentId);

    if (!customerDepartment) return res.status(404).json({error: 'customer department not found'})

    customerDepartment.name = req.body.username;
    customerDepartment.description = req.body.email;
    await customerDepartment.save();

    return res.status(201).json(customerDepartment);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: delete customer department
// route: /api/customerDepartments - DELETE
router.delete('', async (req: Request, res: Response) => {
  try {
    const customerDepartmentId = req.body.id;
    const customerDepartment: CustomerDepartment = await customerDepartmentService.getCustomerDepartment(customerDepartmentId);

    if (!customerDepartment) return res.status(404).json({error: 'customer department not found'})

    customerDepartment.isPublished = false;
    customerDepartment.isDeleted = true;
    await customerDepartment.save();

    return res.status(201).json(customerDepartment);
  } catch (error) {
    res.status(501).send(error);
  }
});

export default router;