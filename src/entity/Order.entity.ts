import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { OrderDetail } from "./OrderDetail.entity";
import { OrderStatus } from "./OrderStatus.entity";
import { TableOrder } from "./TableOrder.entity";
import { User } from "./User.entity";

@Entity({ name: "order" })
export class Order extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  customerName: string;

  @Column()
  customerContact: string;

  @Column({ nullable: true })
  description: string;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  subtotal: number;

  @Column()
  address: string;

  @Column()
  order_number: string;

  @Column({ nullable: true })
  is_published: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.order)
  orderDetail: OrderDetail[];

  @OneToMany(type => TableOrder, tableOrder => tableOrder.order)
  tableOrder: TableOrder[];
  
  @ManyToOne(type => OrderStatus, orderStatus => orderStatus.order)
  @JoinColumn([
    { name: 'order_status_id'},
  ])
  order_status_id: OrderStatus;

  @ManyToOne(type => User, user => user.order0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.order1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;
  
  

}
