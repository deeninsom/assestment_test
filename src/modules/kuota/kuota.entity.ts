import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Kuotas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tanggal: string;

  @Column({ type: "float", nullable: true })
  kuota: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

