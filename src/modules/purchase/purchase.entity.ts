import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import Suppliers from '../supplier/supplier.entity';
import PurchaseItems from './purchase_item/purchase_item.entity';

@Entity()
export default class Purchases {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    nota_number: string;

    @Column({ type: 'float' })
    total_price: number

    @ManyToOne(() => Suppliers, (supplier) => supplier.purchase)
    @JoinColumn({ name: 'supplier_id' })
    supplier_id: Suppliers;

    @OneToMany(() => PurchaseItems, (itemPembelian) => itemPembelian.purchase, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    items: PurchaseItems[];

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}
