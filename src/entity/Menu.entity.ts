import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { OrderDetail } from "./OrderDetail.entity";
import { InvoiceDetail } from "./InvoiceDetail.entity";
import { Product } from "./Product.entity";
import { Menu_category } from "./Menu_category.entity";
import { Branch_menu } from "./Branch_menu.entity";

@Entity({ name: "menu" })
export class Menu extends BaseEntity {

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
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @Column({ nullable: true })
  imageDownloadUrl: string;
  
  @Column({ nullable: true })
  imageFilePath: string;

  @OneToMany(type => OrderDetail, orderDetail => orderDetail.menu)
  orderDetails: OrderDetail[];
  
  @OneToMany(type => InvoiceDetail, invoiceDetail => invoiceDetail.menu)
  invoiceDetails: InvoiceDetail[];

  @OneToMany(type => Branch_menu, Branch_menu => Branch_menu.menu)
  branch_menu: Branch_menu[];

  @ManyToOne(type => Product, product => product.menu, {nullable:true} )
  @JoinColumn([
    { name: 'product_id' },
  ])
  product_id: Product;

  @ManyToOne(type => Menu_category, menu_category => menu_category.menu)
  @JoinColumn([
    { name: 'menu_category_id' },
  ])
  menu_category_id: Menu_category;

}
