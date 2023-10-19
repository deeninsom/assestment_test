import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
    ) { }

    async get(): Promise<Products[]> {
        return await this.productRepository.find({
            relations: {
                supplier: true
            }
        });
    }

    async getId(id: string): Promise<Products> {
        const findProduct = await this.productRepository.findOne({
            where: { id }
        });
        if (!findProduct) throw new HttpException(`Product dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findProduct
    }

    async create(payload: Products): Promise<Products | null> {
        return await this.productRepository.save(payload);
    }

    async update(id: string, payload: any): Promise<Products> {
        const findProduct = await this.productRepository.findOne({
            where: { id }
        });
        if (!findProduct) throw new HttpException(`Product dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.productRepository.save(payload)
        return await this.productRepository.findOne({ where: { id: findProduct.id } })
    }

    async delete(id: string): Promise<void> {
        const findProduct = await this.productRepository.findOne({
            where: { id }
        });
        if (!findProduct) throw new HttpException(`Product dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.productRepository.delete(findProduct)
    }
}
