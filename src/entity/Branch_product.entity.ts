import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "./Branch.entity";
import { Product } from "./Product.entity";

@Entity({ name: "branch_product" })
export class Branch_product extends BaseEntity {
  
  @ManyToOne(type => Branch, branch => branch.branch_product, { primary: true })
  branch: Branch;

  @ManyToOne(type => Product, product => product.branch_product, { primary: true })
  product: Product;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  unit_instock: number;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  cost_of_sale: number;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  sale_price: number;

}
