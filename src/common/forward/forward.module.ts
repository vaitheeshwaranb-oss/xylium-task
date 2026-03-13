import { Module } from '@nestjs/common';
import { ConfigForwardModule } from './configuration/configuration.forward.module';
import { ConnectionForwardModuleTsModule } from './connection/connection.forward.module';
import { RedisForwardModule } from './redis/redis.forword.module';
import { RedisConnectionForward } from './redis-connection/redis-connection.forward';

@Module({
  imports: [
    ConnectionForwardModuleTsModule,
    ConfigForwardModule,
    RedisForwardModule,
    RedisConnectionForward,
  ],
})
export class ForwardModule {}
