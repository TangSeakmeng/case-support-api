
import { Product } from '../entity/Product.entity';

export class ProductService {

  public getAllProducts = async () => {
    const products = await Product.find({ relations: ["createdBy", "updatedBy", "product_brand_id", "product_category_id"] });
    return products;
  }

}