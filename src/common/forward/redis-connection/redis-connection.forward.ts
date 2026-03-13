import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/common/configuration/configuration.module';
import { ConfigurationService } from 'src/common/configuration/configuration.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        type: 'single',
        options: {
          host: config.redisConfig.host,
          port: config.redisConfig.port,
        },
      }),
    }),
  ],
})
export class RedisConnectionForward {}
