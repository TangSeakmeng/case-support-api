import { Request, Response, Router } from "express";
import { getConnection, getConnectionManager } from "typeorm";
import { Branch_menu } from "../entity/Branch_menu.entity";
import { BranchMenuService } from "../services/branchMenuService.service";

// const connection = getConnection();
// const queryRunner = connection.createQueryRunner();

const branchMenuRouter = Router();
const branchMenuService = new BranchMenuService();

// api/branchMenu - GET : get all branch_menu
branchMenuRouter.get("", async (req: Request, res: Response) => {
  try {
    const branch_menus = await branchMenuService.getAllBranchMenus();
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// api/branchMenu/branch/:branchId/:pageNumber/:pageSize - GET : get all branch_menu with pagination
branchMenuRouter.get("/branch/:branchId/:pageNumber/:pageSize", async (req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const pageNumber = req.params.pageNumber;
    const pageSize = req.params.pageSize;
    const branch_menus = await branchMenuService.getBranchMenu(branchId, pageNumber, pageSize);
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// api/branchMenu/:branchId/:menuId - GET : get all specific menu on branch
branchMenuRouter.get("/:branchId/:menuId", async (req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const menuId = req.params.menuId;
    const branch_menus = await branchMenuService.getBranchMenubyId(branchId, menuId);
    // const branch_menus = (await branchMenuService.getAllBranchMenus()).filter(({ branch }) => branch.id === branchId).find(({menu}) => menu.id === menuId);
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
}
);

// api/branchMenu/branch/:branchId/:categoryId/byCat - GET : get all menu on specfic branch and category
branchMenuRouter.get("/:branchId/:categoryId/byCat", async (req: Request, res: Response) => {
  try {
    const branchId = req.params.branchId;
    const categoryId = req.params.categoryId;
    const branch_menus = await branchMenuService.getBranchMenubyCategoryId(branchId, categoryId);
    res.status(200).send(branch_menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/branchMenu/create - POST : create menu with branch
branchMenuRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const connection = getConnectionManager().get();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const branch_menu = {
      branch: req.body.branch,
      menu: req.body.menu,
      sale_price: req.body.sale_price,
      discount_price: req.body.discount_price
    };

    const insertBranchMenu: Branch_menu = Branch_menu.create(branch_menu);
    const result = await insertBranchMenu.save();
    await queryRunner.commitTransaction();

    return res.status(201).json(result);
  } catch (error) {
    // await queryRunner.rollbackTransaction();
    return res.status(501).json(error);
  } finally {
    // await queryRunner.release();
  }
});

branchMenuRouter.put("/:branchId/:menuId/update", async (req: Request, res: Response) => {
  try {
    console.log(req.params)

    const branchId = req.params.branchId;
    const menuId = req.params.menuId;
    const sale_price = req.body.sale_price;
    const discount_price = req.body.discount_price;

    const branch_menus = await branchMenuService.getBranchMenubyId(branchId, menuId);

    if (!branch_menus) {
      return res.status(404).json({ error: "menu not found" });
    }

    if (req.body === undefined) {
      res.statusMessage = "please send a valid body to update record";
      res.statusCode = 400;
      res.end();
      return;
    }

    await Branch_menu.query(
      'UPDATE branch_menu SET sale_price, discount_price = $2 WHERE "branchId"= $3 AND "menuId" = $4',
      [sale_price, discount_price, branchId, menuId]
    );

    const result = await branchMenuService.getBranchMenubyId(branchId, menuId);

    if (result.length === 0) 
      res.status(404).json("null");
    if (result.length === 1) 
      res.status(200).json(result[0]);
    else 4
      res.status(200).json(result[0]);
  } catch (error) {
    res.status(501).send(error);
  }
}
);

export default branchMenuRouter;
