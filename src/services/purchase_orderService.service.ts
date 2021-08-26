import { Purchase_order } from '../entity/Purchase_order.entity';

export class Purchase_orderService {

  public getAllPurchase_orders = async () => {
    const purchase_orders = await Purchase_order.find({ relations: ["updatedBy", "createdBy", "supplier_id"] });
    return purchase_orders;
  }

}