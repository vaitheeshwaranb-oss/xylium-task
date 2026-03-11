import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDetailDocument =  HydratedDocument<UserDetail>;

@Schema({ timestamps: true })
export class UserDetail {
    @Prop({ required: true })
    readonly gender!: string;

    @Prop({ type: String })
    readonly location!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    readonly user_id!: mongoose.Schema.Types.ObjectId;
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);