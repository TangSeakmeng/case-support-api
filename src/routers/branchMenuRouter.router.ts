import { Request, Response, Router } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Branch } from '../entity/Branch.entity';
import { Branch_menu } from '../entity/Branch_menu.entity';
import { BranchMenuService } from '../services/branchMenuService.service';
const branchMenuRouter = Router();
const branchMenuService = new BranchMenuService();

// api/branchMenu -GET

branchMenuRouter.get('', async (req: Request, res: Response) => {
  try {
    const branch_menus = await branchMenuService.getAllBranchMenus();
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

//api/branchMenu/branch/:id - get by branch id

branchMenuRouter.get('/branch/:id', async ( req: Request, res: Response) => {
  try {
    const branch_menus = (await branchMenuService.getAllBranchMenus()).filter(({ branch }) => branch.id === req.params.id);
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

//api/branchMenu/:id
branchMenuRouter.get('/:branchId/:menuId', async ( req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const menuId = req.params.menuId;
    const branch_menus = (await branchMenuService.getAllBranchMenus()).filter(({ branch }) => branch.id === branchId).find(({menu}) => menu.id === menuId);
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});
// /api/branchMenu/create - POST
branchMenuRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const branch_menu = {
      branch: req.body.branch,
      menu: req.body.menu,
      sale_price: req.body.sale_price
    };
    const insertBranchMenu: Branch_menu = Branch_menu.create(branch_menu);
    const result = await insertBranchMenu.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default branchMenuRouter;