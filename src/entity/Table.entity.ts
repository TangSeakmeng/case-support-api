import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { TableOrder } from "./TableOrder.entity";
import { User } from "./User.entity";
import { TableStatus } from "./TableStatus.entity";

@Entity({ name: "table" })
export class Table extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ nullable: true })
  is_published: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.table0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.table1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @ManyToOne(type => TableStatus, tableStatus => tableStatus.table)
  @JoinColumn([
    { name: 'table_status_id'},
  ])
  table_status_id: TableStatus;

  @OneToMany(type => TableOrder, tableOrder => tableOrder.table)
  tableOrder: TableOrder[];
}
