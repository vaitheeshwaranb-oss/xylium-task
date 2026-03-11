import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from 'src/common/configuration/configuration.module';
import { ConfigurationService } from 'src/common/configuration/configuration.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: (config: ConfigurationService) => ({
                uri: config?.mongooseConfig?.users,
            }),
        }),
    ],
})
export class ConnectionForwardModuleTsModule {}
