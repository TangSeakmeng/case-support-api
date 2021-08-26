import { OrderStatus } from '../entity/OrderStatus.entity';

export class OrderStatusService {

  public getAllOrderStatus = async () => {
    const allorderStatus = await OrderStatus.find();
    return allorderStatus;
  }

}