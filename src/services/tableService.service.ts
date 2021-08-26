import { Table } from '../entity/Table.entity';

export class TableService {

  public getAllTables = async () => {
    const tables = await Table.find({ relations: ["createdBy", "updatedBy"] });
    return tables;
  }

}