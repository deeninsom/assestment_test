import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async get(@Res() res: Response) {
        try {
            const data = await this.productService.get()
            return res.status(200).json({ message: "Berhasil menampilkan product", data })
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
            const data = await this.productService.getId(id)
            return res.status(200).json({ message: "Berhasil menampilkan product", data })
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
    @Post()
    async create(@Body() payload: any, @Res() res: Response) {
        try {
            const data = await this.productService.create(payload)
            return res.status(200).json({ message: "Berhasil menambahkan product", data })
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
            const data = await this.productService.update(id, payload)
            return res.status(200).json({ message: "Berhasil memperbarui product", data })
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
            await this.productService.delete(id)
            return res.status(200).json({ message: "Berhasil menghapus product", data: {} })
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ status: false, message: error.message });
            } else {
                return res.status(500).json({ status: false, message: 'Terjadi kesalahan server !', error: error.message });
            }
        }
    }
}
