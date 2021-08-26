import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { InvoiceDetail } from "./InvoiceDetail.entity";
import { User } from "./User.entity";

@Entity({ name: "invoice" })
export class Invoice extends BaseEntity {
  
  @PrimaryColumn("uuid")
  id: string;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  total_discount: number;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  subtotal: number;

  @Column({ nullable: true })
  is_published: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.invoice0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.invoice1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @OneToMany(type => InvoiceDetail, invoiceDetail => invoiceDetail.invoice)
  invoiceDetail: InvoiceDetail[];
}