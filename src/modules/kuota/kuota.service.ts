import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Kuotas from './kuota.entity';
import { KuotaDTO } from './kuota.dto';

@Injectable()
export class KuotaService {
    constructor(
        @InjectRepository(Kuotas)
        private kuotaRepository: Repository<Kuotas>,
    ) { }

    async get(search: string) {
        const whereCondition = search ? { tanggal: Like(`%${search}%`) } : {}
        const result = await this.kuotaRepository.find({
            where: whereCondition,
            order: {created_at: "ASC"}
        });
        return result
    }

    async getId(id: string): Promise<KuotaDTO> {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
        return findBooking
    }

    async create(kuotaDTO: KuotaDTO): Promise<any> {
        const createKuota = await this.kuotaRepository.save(kuotaDTO);
        return createKuota
    }

    async update(id: string, payload: any): Promise<KuotaDTO> {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.kuotaRepository.save(payload)
        return await this.kuotaRepository.findOne({ where: { id: findBooking.id } })
    }

    async delete(id: string): Promise<void> {
        const findBooking = await this.kuotaRepository.findOne({
            where: { id: id }
        });
        if (!findBooking) throw new HttpException(`Booking dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

        await this.kuotaRepository.delete(findBooking)
    }
}
