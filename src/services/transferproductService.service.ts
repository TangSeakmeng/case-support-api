import { Transfer_product } from "../entity/Transfer_product.entity";

export class TransferProductService {

    public getAllTransferProducts = async () => {
      const transfer_products = await Transfer_product.find({ relations: ["from_branch_id", "to_branch_id", "createdBy", "updatedBy"] });
      return transfer_products;
    }
  
  }