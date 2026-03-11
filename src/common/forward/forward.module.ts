import { Module } from '@nestjs/common';
import { ConfigForwardModule } from './configuration/configuration.forward.module';
import { ConnectionForwardModuleTsModule } from './connection/connection.forward.module';
import { RedisForwardModule } from './redis/redis.forword.module';

@Module({
  imports: [ConnectionForwardModuleTsModule, ConfigForwardModule, RedisForwardModule]
})
export class ForwardModule {}
