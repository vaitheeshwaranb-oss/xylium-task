import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model, ObjectId } from 'mongoose';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { GeneralEnum, ProductEnum } from 'src/common/enum/enum';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    async createNewProduct(createProductDto: ProductDto): Promise<ResponseInterface> {
        const product = new this.productModel(createProductDto);
        await product.save();

        return {
            message: ProductEnum.CREATED,
            data: product,
        }
    }

    async update(id: ObjectId, updateProductDto: UpdateProductDto): Promise<ResponseInterface> {
        const updateProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true}).select('-_id name price rating user_id');

        if(!updateProduct) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return {
            message: ProductEnum.UPDATED,
            data: updateProduct,
        }
    }

    async fetchAll(): Promise<ResponseInterface> {
        const products = await this.productModel.find({}, 'name price rating user_id').exec();

        return {
            message: ProductEnum.RETRIVED,
            data: products,
            length: products?.length
        }
    }

    async fetchById(id: ObjectId): Promise<ResponseInterface> {
        const product = await this.productModel.findById(id, 'name price rating user_id').exec();

        if (!product) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return {
            message: ProductEnum.RETRIVED,
            data: product,
        }
    }
}
