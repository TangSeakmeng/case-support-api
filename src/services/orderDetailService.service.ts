import { OrderDetail } from '../entity/OrderDetail.entity';

export class OrderDetailService {

  public getAllOrderDetails = async () => {
    const orderDetails = await OrderDetail.find({ relations: ["order", "menu"] });
    return orderDetails;
  }

}