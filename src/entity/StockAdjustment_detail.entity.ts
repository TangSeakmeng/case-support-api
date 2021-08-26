import {Entity, Column, BaseEntity, ManyToOne} from "typeorm";
import { Product } from "./Product.entity";
import { StockAdjustment } from "./StockAdjustment.entity";

@Entity({ name: "stockAdjustment_detail" })
export class StockAdjustment_detail extends BaseEntity {
  
  @ManyToOne(type => Product, product => product.stockAdjustment_detail, { primary: true })
  product: Product;

  @ManyToOne(type => StockAdjustment, stockAdjustment => stockAdjustment.StockAdjustment_detail, { primary: true })
  stockAdjustment: StockAdjustment;

  @Column()
  qty: number;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  cos_of_good_sold: number;

  @Column({ type:"text" })
  description: string;



}
