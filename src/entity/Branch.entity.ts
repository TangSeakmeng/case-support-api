import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User.entity";
import { Branch_user } from "./Branch_user.entity";
import { Purchase_order } from "./Purchase_order.entity";
import { Transfer_product } from "./Transfer_product.entity";
import { Branch_product } from "./Branch_product.entity";
import { Branch_menu } from "./Branch_menu.entity";

@Entity({ name: "branch" })
export class Branch extends BaseEntity {
    @PrimaryColumn("uuid")
  id: string;

  @Column({type: "varchar", length: 30 })
  name: string;

  @Column({type: "text"})
  description: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.branch0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.branch1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @OneToMany(type => Branch_product, branch_product => branch_product.branch)
  branch_product: Branch_product[];
  
  @OneToMany(type => Purchase_order, purchase_order => purchase_order.branch_id, {
    cascade: true
  })
  branch_id: Purchase_order[];

  @OneToMany(type => Branch_user, Branch_user => Branch_user.branch)
  branch_user: Branch_user[];

  @OneToMany(type => Branch_menu, Branch_menu => Branch_menu.branch)
  branch_menu: Branch_menu[];

  @OneToMany(type => Transfer_product, transfer_product => transfer_product.to_branch_id, {
    cascade: true
  })
  transfer_product0: Transfer_product[];

  @OneToMany(type => Transfer_product, transfer_product => transfer_product.from_branch_id, {
    cascade: true
  })
  transfer_product1: Transfer_product[];
}