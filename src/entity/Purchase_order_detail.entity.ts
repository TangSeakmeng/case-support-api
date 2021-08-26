import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Purchase_order } from "./Purchase_order.entity";
import { Product } from "./Product.entity";

@Entity({ name: "purchase_order_detail" })
export class Purchase_order_detail extends BaseEntity {
  
    @ManyToOne(type => Product, product => product.purchase_order_details, { primary: true })
    product: Product;
  
    @ManyToOne(type => Purchase_order, purchase_order => purchase_order.purchase_order_detail, { primary: true })
    purchase_order: Purchase_order;
  
    @Column()
    qty: number;
  
    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    price: number;

}
