import {Entity, Column, BaseEntity, ManyToOne} from "typeorm";
import { Product } from "./Product.entity";
import { Transfer_product } from "./Transfer_product.entity";


@Entity({ name: "transfer_detail" })
export class Transfer_detail extends BaseEntity {
  
  @ManyToOne(type => Product, product => product.transfer_detail, { primary: true })
  product: Product;

  @ManyToOne(type => Transfer_product, transfer_product => transfer_product.transfer_detail, { primary: true })
  transfer_product: Transfer_product;

  @Column()
  qty: number;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, }  )
  price: number;

}
