import { TableStatus } from '../entity/TableStatus.entity';

export class TableStatusService {

  public getAllOrderStatus = async () => {
    const allTableStatus = await TableStatus.find();
    return allTableStatus;
  }

}