import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserDetail, UserDetailSchema } from './schema/user-details.schema';
import { BullQueueModule } from 'src/common/bull-queue/bull-queue.module';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { ConnectionForwardModuleTsModule } from 'src/common/forward/connection/connection.forward.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
      ],
    ),
    MongooseModule.forFeature([ { name: UserDetail.name, schema: UserDetailSchema }]),
    BullQueueModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
