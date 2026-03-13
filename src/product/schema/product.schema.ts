import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  readonly name!: string;

  @Prop({ type: Number, required: true })
  readonly price!: number;

  @Prop({ type: Number })
  readonly rating!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  readonly user_id!: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
