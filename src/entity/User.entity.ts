import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, PrimaryColumn, OneToOne, JoinColumn} from "typeorm";
import { Branch } from "./Branch.entity";
import { Category } from "./Category.entity";
import { Invoice } from "./Invoice.entity";
import { Table } from "./Table.entity";
import { Purchase_order } from "./Purchase_order.entity";
import { Brand } from "./Brand.entity";
import { StockAdjustment } from "./StockAdjustment.entity";
import { Branch_user } from "./Branch_user.entity";
import { Employee } from "./Employee.entity";
import { Product } from "./Product.entity";
import { Menu_category } from "./Menu_category.entity";
import { Transfer_product } from "./Transfer_product.entity";
import { Order } from "./Order.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  username: string;

  @Column({ type: "varchar", length: 30 })
  email: string;

  @Column({ type: "varchar", length: 250 })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  imageDownloadUrl: string;
  
  @Column({ nullable: true })
  imageFilePath: string;

  @Column({ nullable: true })
  created_Date: Date;

  @Column({ nullable: true })
  updated_Date: Date;

  @Column({ nullable: true })
  token: string;

  @OneToMany(type => Category, category => category.createdBy, {
    cascade: true
  })
  categories0: Category[];

  @OneToMany(type => Category, category => category.updatedBy, {
    cascade: true
  })
  categories1: Category[];

  @OneToMany(type => Transfer_product, transfer_product => transfer_product.createdBy, {
    cascade: true
  })
  transfer_product0: Transfer_product[];

  @OneToMany(type => Transfer_product, transfer_product => transfer_product.updatedBy, {
    cascade: true
  })
  transfer_product1: Transfer_product[];

  @OneToMany(type => Menu_category, menu_category => menu_category.createdBy, {
    cascade: true
  })
  menu_categories0: Menu_category[];

  @OneToMany(type => Menu_category, menu_category => menu_category.updatedBy, {
    cascade: true
  })
  menu_categories1: Menu_category[];

  @OneToMany(type => Invoice, invoice => invoice.createdBy, {
    cascade: true
  })
  invoice0: Invoice[];

  @OneToMany(type => Invoice, invoice => invoice.updatedBy, {
    cascade: true
  })
  invoice1: Invoice[];

  @OneToMany(type => Table, table => table.createdBy, {
    cascade: true
  })
  table0: Table[];

  @OneToMany(type => Table, table => table.updatedBy, {
    cascade: true
  })
  table1: Table[];

  @OneToMany(type => Order, order => order.createdBy, {
    cascade: true
  })
  order0: Order[];

  @OneToMany(type => Order, order => order.updatedBy, {
    cascade: true
  })
  order1: Order[];

  @OneToMany(type => Product, product => product.createdBy, {
    cascade: true
  })
  product0: Product[];

  @OneToMany(type => Product, product => product.updatedBy, {
    cascade: true
  })
  product1: Product[];

  @OneToMany(type => Branch, branch => branch.createdBy, {
    cascade: true
  })
  branch0: Branch[];

  @OneToMany(type => Branch, branch => branch.updatedBy, {
    cascade: true
  })
  branch1: Branch[];

  @OneToMany(type => Purchase_order, purchase_order => purchase_order.createdBy, {
    cascade: true
  })
  pruchase_order0: Purchase_order[];

  @OneToMany(type => Purchase_order, purchase_order => purchase_order.updatedBy, {
    cascade: true
  })
  purchase_order1: Purchase_order[];
  
  @OneToMany(type => Brand, brand => brand.createdBy, {
    cascade: true
  })
  brand0: Brand[];

  @OneToMany(type => Brand, brand => brand.updatedBy, {
    cascade: true
  })
  brand1: Brand[];

  @OneToMany(type => StockAdjustment, stockAdjustment => stockAdjustment.createdBy, {
    cascade: true
  })
  stockAdjustment0: StockAdjustment[];

  @OneToMany(type => StockAdjustment, stockAdjustment => stockAdjustment.updatedBy, {
    cascade: true
  })
  stockAdjustment1: StockAdjustment[];

  @OneToMany(type => Branch_user, branch_user => branch_user.user)
  branch_user: Branch_user[];

  @OneToOne(type => Employee, employee => employee.user)
  @JoinColumn([
    { name: 'employee_id' },
  ])
  employee_id: Employee;
}
