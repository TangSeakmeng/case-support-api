import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User.entity";
import { StockAdjustment_detail } from "./StockAdjustment_detail.entity";

@Entity({ name: "stockAdjustment" })
export class StockAdjustment extends BaseEntity {
  
  @PrimaryColumn("uuid")
  id: string;

  @Column( { type: 'decimal', precision: 5, scale: 2, default: 0, } )
  total_adjustment: number;

  @Column({ nullable: true })
  is_published: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.stockAdjustment0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.stockAdjustment1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @OneToMany(type => StockAdjustment_detail, stockAdjustment_detail => stockAdjustment_detail.stockAdjustment)
  StockAdjustment_detail: StockAdjustment_detail[];
}