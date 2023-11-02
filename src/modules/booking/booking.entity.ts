import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode_booking: string;

  @Column({ nullable: true })
  jalur: string;

  @Column({ nullable: true })
  tanggal_naik: string;

  @Column({ nullable: true })
  tanggal_turun: string;

  @Column({ nullable: true })
  nama_ketua: string;

  @Column({ nullable: true })
  alamat_ketua: string;

  @Column({ nullable: true })
  no_identitas_ketua: string;

  @Column({ nullable: true })
  no_telepone_ketua: string;

  @Column({ nullable: true })
  tempat_lahir_ketua: string;

  @Column({ nullable: true })
  tanggal_lahir_ketua: string;

  @Column({ nullable: true })
  jenis_kelamin_ketua: string;

  @Column({ nullable: true })
  kebangsaan_ketua: string;

  @Column({ nullable: true })
  no_kontak_darurat_ketua: string;

  @Column({ type: 'json', nullable: true })
  anggota: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: false })
  naik: boolean;

  @Column({ default: false })
  turun: boolean;

  @Column({ nullable: true })
  tarif: number;

  @Column({ type: 'float', nullable: true })
  rombongan: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

