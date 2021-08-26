import {Entity, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { Purchase_order } from "./Purchase_order.entity";

@Entity({ name: "supplier" })
export class Supplier extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  contact: string;
  
  @OneToMany(type => Purchase_order, purchase_order => purchase_order.supplier_id, {
    cascade: true
  })
  supplier_id: Supplier[];
}