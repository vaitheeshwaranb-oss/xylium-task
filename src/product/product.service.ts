import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { GeneralEnum, ProductEnum, RedisEnum } from 'src/common/enum/enum';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async createNewProduct(
    createProductDto: ProductDto,
  ): Promise<ResponseInterface> {
    const product = new this.productModel(createProductDto);
    await product.save();

    return {
      message: ProductEnum.CREATED,
      data: product,
    };
  }

  async update(
    id: ObjectId,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseInterface> {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .select('-_id name price rating user_id');

    if (!updateProduct) {
      throw new NotFoundException(GeneralEnum.NOT_FOUND);
    }

    return {
      message: ProductEnum.UPDATED,
      data: updateProduct,
    };
  }

  async fetchAll(): Promise<ResponseInterface> {
    const redisProducts = await this.redisClient.get('products');

    console.log('redisProducts: ', redisProducts);

    if (!redisProducts) {
      const products = await this.productModel
        .find({}, 'name price rating user_id')
        .exec();

      if (!products) {
        throw new NotFoundException(GeneralEnum.NOT_FOUND);
      }

      await this.redisClient.set('products', JSON.stringify(products));

      return {
        message: ProductEnum.RETRIVED,
        data: products,
        length: products.length,
      };
    }

    const parsedProducts: Product[] = JSON.parse(redisProducts) as Product[];

    return {
      message: ProductEnum.RETRIVED,
      data: parsedProducts,
      length: Array.isArray(parsedProducts) ? parsedProducts.length : 0,
    };
  }

  async setValueToRedis(
    key: string,
    value: string,
  ): Promise<ResponseInterface> {
    await this.redisClient.set(key, value);
    return {
      message: RedisEnum.REDIS_SET,
      data: { key, value },
    };
  }

  async getValueFromRedis(key: string): Promise<ResponseInterface> {
    const value = await this.redisClient.get(key);
    return {
      message: RedisEnum.REDIS_GET,
      data: { key, value },
    };
  }

  async fetchById(id: string): Promise<ResponseInterface> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(GeneralEnum.INVAILD_ID);
    }

    const product = await this.productModel
      .findById(id, 'name price rating user_id')
      .exec();

    if (!product) {
      throw new NotFoundException(GeneralEnum.NOT_FOUND);
    }

    return {
      message: ProductEnum.RETRIVED,
      data: product,
    };
  }

  async remove(id: ObjectId): Promise<ResponseInterface> {
    const removeProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!removeProduct) {
      throw new NotFoundException(GeneralEnum.NOT_FOUND);
    }
    return {
      message: ProductEnum.REMOVED,
      data: removeProduct,
    };
  }
}
