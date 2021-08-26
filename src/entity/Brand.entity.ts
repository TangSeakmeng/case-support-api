import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, JoinTable, OneToMany} from "typeorm";
import { Product } from "./Product.entity";
import { User } from "./User.entity";

@Entity({ name: "brand" })
export class Brand extends BaseEntity {

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

  @Column({ nullable: true })
  imageDownloadUrl: string;
  
  @Column({ nullable: true })
  imageFilePath: string;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @ManyToOne(type => User, user => user.brand0)
  @JoinColumn([
    { name: 'createdBy' },
  ])
  createdBy: User;

  @ManyToOne(type => User, user => user.brand1)
  @JoinColumn([
    { name: 'updatedBy'},
  ])
  updatedBy: User;

  @OneToMany(type => Product, product => product.product_brand_id)
  product_brand_id: Brand[];
}
