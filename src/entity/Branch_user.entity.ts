import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "./Branch.entity";
import { User } from "./User.entity";

@Entity({ name: "branch_user" })
export class Branch_user extends BaseEntity {
  
  @ManyToOne(type => Branch, branch => branch.branch_user, { primary: true })
  branch: Branch;

  @ManyToOne(type => User, user => user.branch_user, { primary: true })
  user: User;

  @Column()
  latest_login: Date;

  @Column()
  is_active: boolean;

}
