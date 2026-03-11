import { Module } from '@nestjs/common';
import { ForwardModule } from './common/forward/forward.module';
import { ConfigurationModule } from './common/configuration/configuration.module';
import { UserModule } from './user/user.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ProductModule } from './product/product.module';
import { BullDashboardModule } from './bull-dashboard/bull-dashboard.module';

@Module({
  imports: [ForwardModule, ConfigurationModule, UserModule, AuthenticateModule, ProductModule, BullDashboardModule],
  providers: [],
})
export class AppModule {}
