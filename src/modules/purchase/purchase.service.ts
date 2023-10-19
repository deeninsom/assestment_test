import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Purchases from "./purchase.entity";
import { Like, Repository } from "typeorm";
import PurchaseItems from "./purchase_item/purchase_item.entity";
import Products from "../product/product.entity";
import Suppliers from "../supplier/supplier.entity";



@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchases)
        private purchaseRepository: Repository<Purchases>,

        @InjectRepository(PurchaseItems)
        private purchaseItemRepository: Repository<PurchaseItems>,

        @InjectRepository(Products)
        private productRepository: Repository<Products>,

        @InjectRepository(Suppliers)
        private supplierRepository: Repository<Suppliers>,

    ) { }

    async get(page: number, limit: number, search: string, sort: string): Promise<{
        data: Purchases[];
        page: number;
        totalPages: number;
        totalRows: number;
    }> {

        if (page <= 0) {
            page = 1;
        }

        const whereCondition = search ? { nota_number: Like(`%${search}%`) } : {}
        const orderBy: any = sort === 'createdAt' ? { created_at: 'DESC' } : {}
        const skip = (page - 1) * limit;
        const query = this.purchaseRepository
            .createQueryBuilder('purchase')
            .where(whereCondition)
            .orderBy(orderBy)
            .skip(skip)
            .take(limit);
        const [result, total] = await query.getManyAndCount();

        const totalPages = Math.ceil(total / limit);
        const formattedData: any = await Promise.all(result.map(async (purchase: any) => {
            const items = await this.purchaseItemRepository.find({
                where: {
                    purchase: Like(`${purchase.id}`)
                },
            });

            return {
                id: purchase.id,
                no_nota: purchase.nota_number,
                total_harga: purchase.total_price,
                items: items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    harga: item.purchase_price
                })),
            };
        }));

        return {
            data: formattedData || [],
            page,
            totalPages,
            totalRows: total,
        };
    }

    async create(supplierId: any, items: { product_id: string; quantity: number; purchase_price: number }[]) {
        const purchase = new Purchases();
        purchase.total_price = 0;
        purchase.supplier_id = await this.supplierRepository.findOne({ where: { id: supplierId } });

        const formattedDate = await this.formatDate();
        let sequenceId = 1;

        const existingPurchases = await this.purchaseRepository.find();

        if (existingPurchases.length > 0) {
            sequenceId += existingPurchases.length;
        }

        purchase.nota_number = `${formattedDate}-${sequenceId}`;
        await this.purchaseRepository.save(purchase);

        const itemsArray = [];
        for (const item of items) {
            const purchaseItem = new PurchaseItems();

            const product: any = await this.productRepository.findOne({
                where: {
                    id: item.product_id
                }
            });

            if (item.quantity <= 0) throw new HttpException(`Quantity tidak boleh kurang dari 1!`, HttpStatus.BAD_REQUEST)
            purchaseItem.quantity = item.quantity;
            purchaseItem.purchase_price = product.price * item.quantity;
            purchaseItem.product = product;
            purchaseItem.purchase = purchase;

            await this.purchaseItemRepository.save(purchaseItem);

            const itemObject = {
                id: purchaseItem.id,
                quantity: purchaseItem.quantity,
                harga: purchaseItem.purchase_price,
                product: {
                    id: product.id,
                    namaProduct: product.product_name
                },
            };

            itemsArray.push(itemObject);

            purchase.total_price += purchaseItem.purchase_price;
        }

        await this.purchaseRepository.save(purchase);

        return {
            id: purchase.id,
            no_nota: purchase.nota_number,
            total_harga: purchase.total_price,
            items: itemsArray,
        };
    }

    async delete(id: string): Promise<void> {
        const findPurchase = await this.purchaseRepository.findOne({
            where: { id }
        });
        if (!findPurchase) throw new HttpException(`Pembelian dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.purchaseRepository.delete(findPurchase)
    }

    private async formatDate() {
        const date = new Date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}