
import { Category } from '../entity/Category.entity';

export class CategoryService {

  public getAllCategories = async () => {
    // const categories = await Category.createQueryBuilder('category').getMany();
    const categories = await Category.find({ relations: ["createdBy", "updatedBy"] });
    return categories;
  }

  public getCategoryByUserid = async () => {
    // const categories = await Category.find({"createdBy=: userid"});
    // const categories = await Category.createQueryBuilder('category')
    // .leftJoinAndSelect("categories.createdBy", "createdBy")
    // .where("category.createdBy = :userid", { userid: "29cf8d32-cf91-48d4-a4b7-d4b3c155c9f9" })
    // .getMany();
    // return categories;
  }

}