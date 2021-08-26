import {Entity, Column, BaseEntity, ManyToOne} from "typeorm";
import { Order } from "./Order.entity";
import { Table } from "./Table.entity";

@Entity({ name: "tableOrder" })
export class TableOrder extends BaseEntity {
  
  @ManyToOne(type => Order, order => order.tableOrder, { primary: true })
  order: Order;

  @ManyToOne(type => Table, table => table.tableOrder, { primary: true })
  table: Table;

  @Column()
  checkin_time: Date;

  @Column()
  status: number;

}
