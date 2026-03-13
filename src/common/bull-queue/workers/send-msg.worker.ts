import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { IRepeatJobData } from 'src/common/interface/interface';

@Processor('messageQueue')
export class SendMsgQueue extends WorkerHost {
  async process(job: Job<IRepeatJobData>): Promise<any> {
    await new Promise((reslove) => setTimeout(reslove, 3000));

    if (job?.name === 'send-msg') {
      const attempt = job.attemptsMade + 1;

      if (!job?.data?.message) {
        throw new Error('Email Not Found!');
      }

      console.log(job?.data?.message);
      console.log(`Attempt: ${attempt}`);

      return true;
    }

    throw new Error('Error!');
  }
}
