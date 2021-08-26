import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "./Branch.entity";
import { Menu } from "./Menu.entity";

@Entity({ name: "branch_menu" })
export class Branch_menu extends BaseEntity {
  
  @ManyToOne(type => Branch, branch => branch.branch_menu, { primary: true })
  branch: Branch;

  @ManyToOne(type => Menu, menu => menu.branch_menu, { primary: true })
  menu: Menu;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  sale_price: number;

}
