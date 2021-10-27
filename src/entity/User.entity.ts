import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import { CustomerCompany } from "./CustomerCompany.entity";
import { CustomerDepartment } from "./CustomerDepartment.entity";

@Entity({ name: "tblUser" })
export class User extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  username: string;

  @Column({ type: "varchar", length: 30 })
  email: string;

  @Column({ type: "varchar", length: 250 })
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  imageDownloadUrl: string;
  
  @Column({ nullable: true })
  imageFilePath: string;

  @Column({ nullable: true })
  isActivated: boolean;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdDate: Date;

  @Column({ nullable: true })
  updatedDate: Date;

  @Column({ nullable: true })
  token: string;

  @OneToMany(type => CustomerDepartment, department => department.createdBy, {
    cascade: true
  })
  departmentsCreated?: CustomerDepartment[];

  @OneToMany(type => CustomerDepartment, department => department.updatedBy, {
    cascade: true
  })
  departmentsUpdated?: CustomerDepartment[];

  @OneToMany(type => CustomerCompany, company => company.createdBy, {
    cascade: true
  })
  companiesCreated?: CustomerCompany[];

  @OneToMany(type => CustomerCompany, company => company.updatedBy, {
    cascade: true
  })
  companiesUpdated?: CustomerCompany[];

}
