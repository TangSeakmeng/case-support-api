
import { Transfer_detail } from '../entity/Transfer_detail.entity';

export class Transfer_detailService {

  public getAllTransfer_details = async () => {
    const transfer_details = await Transfer_detail.find({ relations: ["transfer_product", "product"] });
    return transfer_details;
  }

}