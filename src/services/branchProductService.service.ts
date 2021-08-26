
import { Branch_product } from '../entity/Branch_product.entity';

export class BranchProductService {

  public getAllBranchProducts = async () => {
    // const branch_products = await Branch_product.createQueryBuilder('Branch_product').getMany();
    const branch_products = await Branch_product.find({ relations: ["branch", "product"] });
    return branch_products;
  }

}