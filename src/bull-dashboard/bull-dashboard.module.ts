import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        BullBoardModule.forRoot({
            route: '/queues',
            adapter: ExpressAdapter
        }),
    ]
})
export class BullDashboardModule {}
