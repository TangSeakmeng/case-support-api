import { Order } from '../entity/Order.entity';

export class OrderService {

  public getAllOrders = async () => {
    const orders = await Order.find({ relations: ["createdBy", "updatedBy"] });
    return orders;
  }

}