
import { Menu } from '../entity/Menu.entity';

export class MenuService {

  public getAllMenus = async () => {
    // const branch_products = await Branch_product.createQueryBuilder('Branch_product').getMany();
    const menus = await Menu.find({ relations: [ "product_id", "menu_category_id"] });
    return menus;
  }

  // public getMenuById = async () => {
  //   const menus = await Menu.createQueryBuilder("user")
  //   .where("user.id = :id", { id: `{id}` })
  //   .getOne();
  //   return menus;
  // }

}