import { Request, Response, Router } from 'express';
import { Branch_user } from '../entity/Branch_user.entity';
import { BranchUserService } from '../services/branchUserService.service';
import { User } from'../entity/User.entity'
import userRouter from './userRouter.router';
const branchUserRouter = Router();
const branchUserService = new BranchUserService();

// api/branchUser -GET

branchUserRouter.get('', async (req: Request, res: Response) => {
  try {
    const branch_users = await branchUserService.getAllBranchUsers();
    res.status(200).send(branch_users);
  } catch (error) {
    res.status(501).send(error);
  }
});
// get by user_id
branchUserRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const branch_users = await branchUserService.getBranchUserbyId(userId)
    res.status(200).send(branch_users);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/branch_user/create - POST
branchUserRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const branch_user = {
      branch: req.body.branch,
      user: req.body.user,
      is_active: req.body.is_active,
      latest_login: new Date()
    };
    const insertBranchUser: Branch_user = Branch_user.create(branch_user);
    const result = await insertBranchUser.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default branchUserRouter;