import {Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { CustomerCompany } from "./CustomerCompany.entity";
import { User } from "./User.entity";

@Entity({ name: "tblCustomerDepartment" })
export class CustomerDepartment extends BaseEntity {

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

  @ManyToOne(type => CustomerCompany, customerCompany => customerCompany.customerDepartments)
  @JoinColumn([{ name: 'customerCompany' }])
  customerCompany: CustomerCompany;

  @Column()
  createdDate: Date;

  @Column()
  updatedDate: Date;

  @ManyToOne(type => User, user => user.departmentsCreated)
  @JoinColumn([{ name: 'createdBy' }])
  createdBy: User;

  @ManyToOne(type => User, user => user.departmentsUpdated)
  @JoinColumn([{ name: 'updatedBy' }])
  updatedBy: User;

}
