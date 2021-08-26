import {Entity, Column, BaseEntity, ManyToOne} from "typeorm";
import { Menu } from "./Menu.entity";
import { Order } from "./Order.entity";

@Entity({ name: "orderDetail" })
export class OrderDetail extends BaseEntity {
  
  @ManyToOne(type => Order, order => order.orderDetails, { primary: true })
  order: Order;

  @ManyToOne(type => Menu, menu => menu.orderDetails, { primary: true })
  menu: Menu;

  @Column()
  qty: number;

  @Column()
  price: number;

}
