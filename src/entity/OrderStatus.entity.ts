import {Entity, Column, BaseEntity, OneToMany, PrimaryColumn} from "typeorm";
import { Order } from "./Order.entity";

@Entity({ name: "orderStatus" })
export class OrderStatus extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text"})
  description: string;

  @Column()
  order_Number: number;

  @OneToMany(type => Order, order => order.order_status_id, {
    cascade: true
  })
  order: Order[];
}
