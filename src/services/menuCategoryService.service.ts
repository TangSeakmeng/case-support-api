
import { Menu_category } from '../entity/Menu_category.entity';

export class MenuCategoryService {

  public getAllMenuCategories = async () => {
    // const categories = await Category.createQueryBuilder('category').getMany();
    const menu_categories = await Menu_category.find({ relations: ["createdBy", "updatedBy"] });
    return menu_categories;
  }

}