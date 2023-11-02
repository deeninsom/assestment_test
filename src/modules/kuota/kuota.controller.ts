import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { KuotaService } from './kuota.service';
import { Response } from 'express';
import { KuotaDTO } from './kuota.dto';

@ApiTags('kuota')
@Controller('kuota')
export class KuotaController {
    constructor(private readonly kuotaService: KuotaService) { }

    @Get()
    async get(@Res() res: Response, @Query('search') search: string) {
        try {
            const data = await this.kuotaService.get(search)
            return res.status(200).json({ message: "Berhasil menampilkan booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Get(':id')
    async getId(@Param('id') id: string, @Res() res: Response) {
        try {
            const data = await this.kuotaService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Post()
    async create(@Body() payload: KuotaDTO, @Res() res: Response) {
        try {
            const datas: any = payload
            const data = await this.kuotaService.create(datas);
            return res.status(200).json({ message: "Berhasil menambahkan booking", data });
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }


    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                product_name: {
                    type: 'string'
                },
                price: {
                    type: 'number'
                },
                supplier: {
                    type: 'string'
                }
            },
            required: ['product_name', 'supplier'],
        },
    })
    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: any, @Res() res: Response) {
        try {
            const data = await this.kuotaService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui booking", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            await this.kuotaService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus booking", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
