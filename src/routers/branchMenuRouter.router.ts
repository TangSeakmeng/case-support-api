import { Request, Response, Router } from "express";
import { createQueryBuilder } from "typeorm";
import { Branch } from "../entity/Branch.entity";
import { Branch_menu } from "../entity/Branch_menu.entity";
import { BranchMenuService } from "../services/branchMenuService.service";
const branchMenuRouter = Router();
const branchMenuService = new BranchMenuService();

// api/branchMenu -GET

branchMenuRouter.get("", async (req: Request, res: Response) => {
  try {
    const branch_menus = await branchMenuService.getAllBranchMenus();
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

//api/branchMenu/branch/:id - get by branch id

branchMenuRouter.get(
  "/branch/:branchId/:pageNumber/:pageSize",
  async (req: Request, res: Response) => {
    try {
      const branchId = req.params.branchId;
      const pageNumber = req.params.pageNumber;
      const pageSize = req.params.pageSize;
      const branch_menus = await branchMenuService.getBranchMenu(
        branchId,
        pageNumber,
        pageSize
      );
      res.status(200).send(branch_menus);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

//api/branchMenu/:id
branchMenuRouter.get(
  "/:branchId/:menuId",
  async (req: Request, res: Response) => {
    try {
      const branchId = req.params.branchId;
      const menuId = req.params.menuId;
      const branch_menus = await branchMenuService.getBranchMenubyId(
        branchId,
        menuId
      );
      // const branch_menus = (await branchMenuService.getAllBranchMenus()).filter(({ branch }) => branch.id === branchId).find(({menu}) => menu.id === menuId);
      res.status(200).send(branch_menus);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

//api/branchMenu/branch/:branchId/:categoryId

branchMenuRouter.get(
  "/:branchId/:categoryId/byCat",
  async (req: Request, res: Response) => {
    try {
      const branchId = req.params.branchId;
      const categoryId = req.params.categoryId;
      const branch_menus = await branchMenuService.getBranchMenubyCategoryId(
        branchId,
        categoryId
      );
      res.status(200).send(branch_menus);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

// /api/branchMenu/create - POST
branchMenuRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const branch_menu = {
      branch: req.body.branch,
      menu: req.body.menu,
      sale_price: req.body.sale_price,
    };
    const insertBranchMenu: Branch_menu = Branch_menu.create(branch_menu);
    const result = await insertBranchMenu.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

branchMenuRouter.put(
  "/:branchId/:menuId/update",
  async (req: Request, res: Response) => {
    try {
      const branchId = req.params.branchId;
      console.log(branchId);
      const menuId = req.params.menuId;
      console.log(menuId);
      const sale_price = req.body.sale_price;
      const branch_menus = await branchMenuService.getBranchMenubyId(
        branchId,
        menuId
      );
      console.log(branch_menus);
      if (!branch_menus) {
        return res.status(404).json({ error: "menu not found" });
      }

      if (req.body === undefined) {
        res.statusMessage = "please send a valid body to update record";
        res.statusCode = 400;
        res.end();
        return;
      }
      const update_menus = await Branch_menu.query(
        'UPDATE branch_menu SET sale_price = $1 WHERE "branchId"= $2 AND "menuId" = $3',
        [sale_price, branchId, menuId]
      );
      const result = await branchMenuService.getBranchMenubyId(
        branchId,
        menuId
      );
      console.log(update_menus, "updatemenu");
      console.log(result, "result");
      if (result.length === 0) res.status(404).json("null");

      if (result.length === 1) res.status(200).json(result[0]);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

export default branchMenuRouter;
