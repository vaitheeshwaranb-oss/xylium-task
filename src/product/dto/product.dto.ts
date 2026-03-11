import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price!: number;

    @IsNumber()
    readonly rating!: number;

    @IsNotEmpty()
    @IsString()
    readonly user_id!: string;
}

export class UpdateProductDto extends PartialType(ProductDto) {}

