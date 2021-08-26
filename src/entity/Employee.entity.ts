import {Entity, Column, BaseEntity, PrimaryColumn, OneToOne} from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "employee" })
export class Employee extends BaseEntity {
  
  @PrimaryColumn("uuid")
  id: string;

  @Column({type: "varchar", length: 30 })
  firstName: string;

  @Column({type: "varchar", length: 30 })
  lastName: string;

  @Column()
  created_Date: Date;

  @Column()
  updated_Date: Date;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column({ nullable: true })
  is_published: boolean;

  @OneToOne(type => User, user => user.employee_id, {
    cascade: true
  })
  user: User[];

}