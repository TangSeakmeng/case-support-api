import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../entity/Employee.entity';
import { EmployeeService} from '../services/employeeService.service'
const employeeRouter = Router();
const employeeService = new EmployeeService();

// api/employeee -GET

employeeRouter.get('', async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).send(employees);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/employee/create - POST
employeeRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const employee = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      created_Date: new Date(),
      updated_Date: new Date(),
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
    };
    const insertEmployee: Employee = Employee.create(employee);
    const result = await insertEmployee.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default employeeRouter;