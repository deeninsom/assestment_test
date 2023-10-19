import Products from 'src/modules/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Purchases from '../purchase.entity';

@Entity()
export default class PurchaseItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  quantity: number

  @Column({ type: 'float' })
  purchase_price: number

  @ManyToOne(() => Products, (product) => product.purchase)
  @JoinColumn({ name: 'product_id' })
  product: Products[];

  @ManyToOne(() => Purchases, (purchase) => purchase.items)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchases;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
