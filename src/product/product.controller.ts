import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { GeneralEnum } from 'src/common/enum/enum';
import mongoose from 'mongoose';

@Controller('product')
export class ProductController {
    
    constructor(
        private productService: ProductService
    ) {}

    @Post()
    async createNewProduct(@Body() createProductDto: ProductDto): Promise<ResponseInterface> {
        if (!createProductDto) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return await this.productService.createNewProduct(createProductDto);
    }

    @Get()
    async fetchAll(): Promise<ResponseInterface> {
        return await this.productService.fetchAll();
    }

    @Get(':id')
    async findById(@Param('id') id: mongoose.Schema.Types.ObjectId): Promise<ResponseInterface> {
        return await this.productService.fetchById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateProductDto: UpdateProductDto): Promise<ResponseInterface> {
        return await this.productService.update(id, updateProductDto);
    }
}
