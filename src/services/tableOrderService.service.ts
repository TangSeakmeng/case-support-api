import { TableOrder } from '../entity/TableOrder.entity';

export class TableOrderService {

  public getAllTableOrders = async () => {
    const tableOrders = await TableOrder.find({ relations: ["order", "table","table.table_status_id", "order.order_status_id", "order.orderDetail", "order.orderDetail.menu"] });
    return tableOrders;
  }

}