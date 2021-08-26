
import { Menu_category } from '../entity/Menu_category.entity';
import { Branch_menu } from '../entity/Branch_menu.entity';
import { Branch } from '../entity/Branch.entity';
import { Menu } from '../entity/Menu.entity';
import { Connection, getManager } from 'typeorm';
import { createQueryBuilder } from 'typeorm';

export class BranchMenuService {

  public getAllBranchMenus = async () => {
    // const branch_menus = await (await Branch_menu.find({ 
    //   relations: ["branch", "menu"]
    // }));

    // const branch_menus = createQueryBuilder('branch_menu')
    // .innerJoin('branch_menu.menu', 'menu', 'menu.id = branch_menu.menuId')
    // .getMany();

    let result = await Branch_menu
      .createQueryBuilder()
      .select('*')
      .from(Branch_menu, 'branch_menu')
      .innerJoin(
        query => {
          return query
            .from(Branch, 'branch')
            .select('id as "branch_Id", "name" as "branch_name"');
        },
        'branch',
        '"branchId" = branch."branch_Id"'
      )
      .innerJoin(
        query => {
          return query
            .from(Menu, 'menu')
            .select('id as "menu_Id", "name" as "menu_name", "menu_category_id" as "menu_category"')
            .innerJoin(
              query => {
                return query
                  .from(Menu_category, 'menu_category')
                  .select('id as "cat_id", "name" as "cat_name"');
              },
              'menu_category',
              '"menu_category_id" = menu_category."cat_id"'
            );   
        },
        'menu',
        '"menuId" = menu."menu_Id"'
      )
      .getRawMany();

    return result;
  }

}