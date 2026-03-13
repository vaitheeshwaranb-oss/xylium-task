import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SendMailDto } from 'src/user/dto/user-details.dto';

@Processor('mailQueue')
export class SendMailWorker extends WorkerHost {
  async process(job: Job<SendMailDto>): Promise<any> {
    if (job?.name === 'send-mail') {
      await new Promise((reslove) => setTimeout(reslove, 3000));
      const delay = 3000 * Math.pow(2, job.attemptsMade);
      console.log('Job start');

      if (!job.data.message) {
        throw new Error('Not Found!');
      }

      await job.updateProgress(25);
      console.log('25% completed');

      await job.updateProgress(50);
      console.log('50% completed');

      await job.updateProgress(100);
      console.log('completed');

      const mail: string = job?.data?.mail;

      console.log(mail);
      console.log(`Attempt Delay: ${delay / 1000}`);
      return true;
    }

    throw new Error('Error!');
  }
}
