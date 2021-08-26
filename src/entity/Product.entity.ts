import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Purchase_order_detail } from "./Purchase_order_detail.entity";
import { Menu } from "./Menu.entity";
import { User } from "./User.entity";
import { Category } from "./Category.entity";
import { Branch_product } from "./Branch_product.entity";
import { Brand } from "./Brand.entity";
import { StockAdjustment_detail } from "./StockAdjustment_detail.entity";
import { Transfer_detail } from "./Transfer_detail.entity";

@Entity({ name: "product" })
export class Product extends BaseEntity {

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
  imageDownloadUrl: string;
  
  @Column()
  imageFilePath: string;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @OneToMany(type => Purchase_order_detail, purchase_order_detail => purchase_order_detail.product)
  purchase_order_details: Purchase_order_detail[];

  @OneToMany(type => StockAdjustment_detail, stockAdjustment_detail => stockAdjustment_detail.product)
  stockAdjustment_detail: StockAdjustment_detail[];

  @OneToMany(type => Transfer_detail, transfer_detail => transfer_detail.product)
  transfer_detail: Transfer_detail[];

  @OneToMany(type => Branch_product, branch_product => branch_product.product)
  branch_product: Branch_product[];

  @OneToMany(type => Menu, menu => menu.product_id)
  menu: Menu[];

  @ManyToOne(type => Category, category => category.product_category_id)
  @JoinColumn([
    { name: 'product_category_id'},
  ])
  product_category_id: Product;

  @ManyToOne(type => Brand, brand => brand.product_brand_id)
  @JoinColumn([
    { name: 'product_brand_id'},
  ])
  product_brand_id: Product;

  @ManyToOne(type => User, user => user.product0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.product1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;
  
}
