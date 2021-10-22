import {Entity, Column, BaseEntity, OneToMany, PrimaryColumn} from "typeorm";
import { Table } from "./Table.entity";

@Entity({ name: "tableStatus" })
export class TableStatus extends BaseEntity {

  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text"})
  description: string;

  @Column()
  order_Number: number;

  @OneToMany(type => Table, table => table.table_status_id, {
    cascade: true
  })
  table: Table[];
}
