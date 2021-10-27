import { Router } from 'express';

import userRouter from './user.router';
import customerCompanyRouter from './customerCompany.router';
import customerDepartmentRouter from './customerDepartment.router';

const routes = Router();

routes.use('/api/users', userRouter);
routes.use('/api/customerCompanies', customerCompanyRouter);
routes.use('/api/customerDepartments', customerDepartmentRouter);

export default routes;