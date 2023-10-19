import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import Purchases from '../purchase/purchase.entity';
import Products from '../product/product.entity';

@Entity()
export default class Suppliers {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    supplier_name: string;

    @OneToMany(() => Purchases, (purchase) => purchase.supplier_id, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    purchase: Purchases[]

    @OneToMany(() => Products, (product) => product.supplier, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    product: Products[]

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}
