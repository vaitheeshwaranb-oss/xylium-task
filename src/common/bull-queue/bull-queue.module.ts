import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { JobService } from './job/job.service';
import { SendMsgQueue } from './workers/send-msg.worker';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { SendMailWorker } from './workers/send-mail.worker';
import { RepeatQueueWorker } from './workers/repeat-queue.worker';

@Module({
    imports: [
        BullModule.registerQueue(
            {name: 'messageQueue'},
            {name: 'mailQueue'},
            {name: 'repeatQueue'}
        ),
        BullBoardModule.forFeature({
            name: 'messageQueue',
            adapter: BullMQAdapter,
        }),
        BullBoardModule.forFeature({
            name: 'mailQueue',
            adapter: BullMQAdapter,
        }),
        BullBoardModule.forFeature({
            name: 'repeatQueue',
            adapter: BullMQAdapter,
        }),
    ],
    providers: [JobService, SendMsgQueue, SendMailWorker, RepeatQueueWorker],
    exports: [JobService]
})
export class BullQueueModule {}
