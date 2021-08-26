import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Branch } from "./Branch.entity";
import { User } from "./User.entity";
import { Purchase_order_detail } from "./Purchase_order_detail.entity";
import { Supplier } from "./Supplier.entity";

@Entity({ name: "purchase_order" })
export class Purchase_order extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  subtotal: number;

  @Column()
  purchase_Date: Date;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column({ nullable: true })
  is_published: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.pruchase_order0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.purchase_order1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @ManyToOne(type => Branch, branch => branch.branch_id)
  @JoinColumn([
    { name: 'branch_id'},
  ])
  branch_id: Branch[];
  
  @OneToMany(type => Purchase_order_detail, purchase_order_detail => purchase_order_detail.purchase_order)
  purchase_order_detail: Purchase_order_detail[];

  @ManyToOne(type => Supplier, supplier => supplier.supplier_id)
  @JoinColumn([
    { name: 'supplier_id' },
  ])
  supplier_id: Supplier;
}
