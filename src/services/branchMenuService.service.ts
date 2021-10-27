import { Branch_menu } from "../entity/Branch_menu.entity";

export class BranchMenuService {
  
  public getAllBranchMenus = async () => {
    const branch_menus = await Branch_menu.find({
      relations: ["branch", "menu", "menu.menu_category_id", "menu.product_id"],
    });
    return branch_menus;
  };

  public getBranchMenu = async (
    branchId: string,
    pageNumber: any,
    pageSize: any
  ) => {
    const count = await Branch_menu.count({
      relations: ["branch", "menu", "menu.menu_category_id", "menu.product_id"],
      where: [{ branch: branchId, }],
    });

    const branch_menus = await Branch_menu.find({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      relations: ["branch", "menu", "menu.menu_category_id", "menu.product_id"],
      where: [
        {
          branch: branchId,
        },
      ],
    });
    
    return { count, branch_menus };
  };

  public getBranchMenubyId = async (branchId: string, menuId: string) => {
    const branch_menus = await Branch_menu.find({
      relations: ["branch", "menu", "menu.menu_category_id", "menu.product_id"],
      where: [
        {
          menu: menuId,
          branch: branchId,
        },
      ],
    });
    return branch_menus;
  };

  public getBranchMenubyCategoryId = async (branchId: string, menuCategoryId: string) => {
    let branch_menus = await Branch_menu.find({
      relations: ["branch", "menu", "menu.menu_category_id", "menu.product_id"],
      where: {
        branch: branchId,
      },
    });

    branch_menus = branch_menus.filter((item) => {
      return item?.menu?.menu_category_id?.id === menuCategoryId;
    });

    return branch_menus;
  };
  
}