import { Purchase_order_detail } from '../entity/Purchase_order_detail.entity';

export class Purchase_order_detailService {

  public getAllPurchase_order_details = async () => {
    const purchase_order_details = await Purchase_order_detail.find({ relations: ["purchase_order"] });
    return purchase_order_details;
  }

}