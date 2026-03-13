import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('repeatQueue', { concurrency: 2 })
export class RepeatQueueWorker extends WorkerHost {
  async process(job: Job): Promise<any> {
    await new Promise((reslove) => setTimeout(reslove, 3000));
    if (job?.name === 'send-repeat') {
      console.log(job?.data?.message);
      return true;
    }

    throw new Error('Error!');
  }
}
