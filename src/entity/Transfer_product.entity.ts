import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Branch } from "./Branch.entity";
import { Transfer_detail } from "./Transfer_detail.entity";
import { User } from "./User.entity";


@Entity({ name: "transfer_product" })
export class Transfer_product extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column()
  transfer_date: Date;

  @ManyToOne(type => Branch, branch => branch.transfer_product0)
  @JoinColumn([
    { name: 'from_branch_id' },
  ])
  from_branch_id: Branch;

  @ManyToOne(type => Branch, branch => branch.transfer_product1)
  @JoinColumn([
    { name: 'to_branch_id'},
  ])
  to_branch_id: Branch;

  @ManyToOne(type => User, user => user.transfer_product0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.transfer_product1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;
  
  @OneToMany(type => Transfer_detail, transfer_detail => transfer_detail.transfer_product)
  transfer_detail: Transfer_detail[];


}
