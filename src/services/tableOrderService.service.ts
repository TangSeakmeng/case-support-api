import { TableOrder } from '../entity/TableOrder.entity';

export class TableOrderService {

  public getAllTableOrders = async () => {
    const tableOrders = await TableOrder.find({ relations: ["order", "table"] });
    return tableOrders;
  }

}