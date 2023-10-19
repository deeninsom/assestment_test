import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { SupplierService } from "./supplier.service";
import { Response } from "express";


@ApiTags('suppliers')
@Controller('suppliers')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }

    @Get()
    async get(@Res() res: Response) {
        try {
            const data = await this.supplierService.get()
            return res.status(200).json({ message: "Berhasil menampilkan supplier", data })
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
            const data = await this.supplierService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan supplier", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                supplier_name: {
                    type: 'string'
                }
            },
            required: ['product_name'],
        },
    })
    @Post()
    async create(@Body() payload: any, @Res() res: Response) {
        try {
            const data = await this.supplierService.create(payload)
            return res.status(200).json({ message: "Berhasil menambahkan supplier", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: any, @Res() res: Response) {
        try {
            const data = await this.supplierService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui supplier", data })
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
            await this.supplierService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus supplier", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
