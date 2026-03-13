import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BullDashboardModule } from 'src/bull-dashboard/bull-dashboard.module';
import { BullQueueModule } from 'src/common/bull-queue/bull-queue.module';
import { ConfigurationModule } from 'src/common/configuration/configuration.module';
import { ConfigurationService } from 'src/common/configuration/configuration.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        connection: {
          host: config?.redisConfig?.host,
          port: config?.redisConfig?.port,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'messageQueue',
    }),
    BullQueueModule,
    BullDashboardModule,
  ],
})
export class RedisForwardModule {}
