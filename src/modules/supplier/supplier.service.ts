import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Suppliers from "./supplier.entity";
import { Repository } from "typeorm";


@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Suppliers)
        private supplierRepository: Repository<Suppliers>,
    ) { }

    async get(): Promise<Suppliers[]> {
        return await this.supplierRepository.find();
    }

    async getId(id: string): Promise<Suppliers> {
        const findSupplier = await this.supplierRepository.findOne({
            where: { id }
        });
        if (!findSupplier) throw new HttpException(`Supplier dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findSupplier
    }

    async create(payload: any): Promise<any> {
        return await this.supplierRepository.save(payload);
    }

    async update(id: string, payload: any): Promise<Suppliers> {
        const findSupplier = await this.supplierRepository.findOne({
            where: { id }
        });
        if (!findSupplier) throw new HttpException(`Supplier dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.supplierRepository.save(payload)
        return await this.supplierRepository.findOne({ where: { id: findSupplier.id } })
    }

    async delete(id: string): Promise<void> {
        const findSupplier = await this.supplierRepository.findOne({
            where: { id }
        });
        if (!findSupplier) throw new HttpException(`Supplier dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.supplierRepository.delete(findSupplier)
    }
}