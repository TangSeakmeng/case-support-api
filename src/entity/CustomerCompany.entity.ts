import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { CustomerDepartment } from "./CustomerDepartment.entity";
import { User } from "./User.entity";

@Entity({ name: "tblCustomerCompany" })
export class CustomerCompany extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ nullable: true })
  isPublished: boolean;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  logoDownloadUrl: string;
  
  @Column({ nullable: true })
  logoFilePath: string;

  @OneToMany(type => CustomerDepartment, customerDepartment => customerDepartment.customerCompany, {
    cascade: true
  })
  customerDepartments?: CustomerDepartment[];

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @ManyToOne(type => User, user => user.departmentsCreated)
  @JoinColumn([{ name: 'createdBy' }])
  createdBy: User;

  @ManyToOne(type => User, user => user.departmentsUpdated)
  @JoinColumn([{ name: 'updatedBy'}])
  updatedBy: User;

}
