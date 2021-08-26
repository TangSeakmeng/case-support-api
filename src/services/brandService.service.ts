
import { Brand } from '../entity/Brand.entity';

export class BrandService {

  public getAllBrands = async () => {
    // const brands = await Category.createQueryBuilder('category').getMany();
    const brands = await Brand.find({ relations: ["createdBy", "updatedBy"] });
    return brands;
  }

}