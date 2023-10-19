import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Query, Res } from "@nestjs/common";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PurchaseService } from "./purchase.service";
import { Response } from "express";


@ApiTags('purchases')
@Controller('purchases')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) { }

    @ApiQuery({
        name: 'sort',
        type: String,
        required: false,
        description: 'Use format body sorting "createdAt" '
    })
    @ApiQuery({
        name: 'search',
        type: String,
        required: false,
    })
    @Get()
    async get(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('sort') sort: string,
        @Query('search') search: string,
        @Res() res: Response
    ) {
        try {
            const {
                data,
                page: currentPage,
                totalPages,
                totalRows,
            } = await this.purchaseService.get(page, limit, search, sort)
            return res.status(200).json({
                status: true,
                message: 'Berhasil menampilkan pembelian',
                page: currentPage,
                totalPages,
                totalRows,
                data
            });
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
                supplier_id: {
                    type: 'string'
                },
                items: {
                    type: 'array',
                    items: {
                        properties: {
                            product_id: { type: 'string' },
                            quantity: { type: 'number' }
                        }
                    }
                },
            },
            required: ['product_id'],
        },
    })
    @Post()
    async create(@Body('supplier_id') supplier_id: string, @Body('items') items: { product_id: string; quantity: number; purchase_price: number }[], @Res() res: Response) {
        try {
            const data = await this.purchaseService.create(supplier_id, items)
            return res.status(200).json({ message: "Berhasil menambahkan pembelian", data })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }

    @Delete(':id')
    async delete(@Param() id: string, @Res() res: Response) {
        try {
            await this.purchaseService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus pembelian", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
