import {Entity, Column, BaseEntity, ManyToOne} from "typeorm";
import { Menu } from "./Menu.entity";
import { Invoice } from "./Invoice.entity";

@Entity({ name: "invoiceDetail" })
export class InvoiceDetail extends BaseEntity {
  
  @ManyToOne(type => Invoice, invoice => invoice.invoiceDetail, { primary: true })
  invoice: Invoice;

  @ManyToOne(type => Menu, menu => menu.invoiceDetails, { primary: true })
  menu: Menu;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  discount: number;

}
