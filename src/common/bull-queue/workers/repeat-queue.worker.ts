import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { IRepeatJobData } from 'src/common/interface/interface';

@Processor('repeatQueue', { concurrency: 2 })
export class RepeatQueueWorker extends WorkerHost {
  async process(job: Job<IRepeatJobData>): Promise<any> {
    await new Promise((reslove) => setTimeout(reslove, 3000));
    if (job?.name === 'send-repeat') {
      const message: string = job.data.message;
      console.log(message);
      return true;
    }

    throw new Error('Error!');
  }
}
