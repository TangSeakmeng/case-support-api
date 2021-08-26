import { Request, Response, Router } from 'express';
import { Branch } from '../entity/Branch.entity';
import { v4 as uuidv4 } from 'uuid';
import { BranchService } from '../services/branchService.service';
const branchRouter = Router();
const branchService = new BranchService();

// api/brand -GET

branchRouter.get('', async (req: Request, res: Response) => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).send(branches);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/brand/create - POST
branchRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const branch = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      contact: req.body.contact,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    };
    const insertbranch: Branch = Branch.create(branch);
    const result = await insertbranch.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default branchRouter;