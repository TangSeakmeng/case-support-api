import { Branch_product } from "../entity/Branch_product.entity";

export class BranchProductService {
  public getAllBranchProducts = async () => {
    const branch_products = await Branch_product.find({
      relations: ["branch", "product", "product.product_category_id"],
    });
    return branch_products;
  };

  public getBranchProducts = async (
    branchId: string,
    pageNumber: any,
    pageSize: any
  ) => {
    const branch_products = await Branch_product.find({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      relations: ["branch", "product", "product.product_category_id"],
      where: [
        {
          branch: branchId,
        },
      ],
    });
    return branch_products;
  };

  public getBranchProductbyCategoryId = async (branchId: string, categoryId: string) => {
    let branch_products = await Branch_product.find({
      relations: ["branch", "product", "product.product_category_id"],
      where: {
        branch: branchId,
      },
    });

    console.log(branch_products)

    branch_products = branch_products.filter((item) => {
      return item.product.product_category_id.id === categoryId;
    });

    return branch_products;
  };

  public getBranchProductbyId = async (branchId: string, productId: string) => {
    const branch_products = await Branch_product.find({
      relations: ["branch", "product", "product.product_category_id"],
      where: [
        {
          product: productId,
          branch: branchId,
        },
      ],
    });
    return branch_products;
  };

  // public updateProductbyId = async (branchId: string, productId: string, unit_instock:string, cost_of_sale:string, sale_price: string ) => {
  //   const branch_products = await Branch_product.find({
  //     relations: ["branch", "product", "product.product_category_id"],
  //     set
  //     where: [{
  //       product: productId,
  //       branch: branchId
  //     }]
  //   });
  //   return branch_products;
  // }
}
