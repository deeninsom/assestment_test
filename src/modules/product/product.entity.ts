import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import PurchaseItems from '../purchase/purchase_item/purchase_item.entity';
import Suppliers from '../supplier/supplier.entity';

@Entity()
export default class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_name: string;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => PurchaseItems, (purchase) => purchase.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  purchase: PurchaseItems[] 

  @ManyToOne(() => Suppliers, (supplier) => supplier.product)
  @JoinColumn({name:'supplier_id'})
  supplier: Suppliers[] 

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
