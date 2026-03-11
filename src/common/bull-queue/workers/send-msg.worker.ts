import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('messageQueue')
export class SendMsgQueue extends WorkerHost {
    async process(job: Job): Promise<any> {
        await new Promise(reslove => setTimeout(reslove, 3000));

        if (job?.name === 'send-msg') {
            const attempt = job.attemptsMade + 1;
            console.log(job?.data?.message);
            console.log(`Attempt: ${attempt}`);
        }

        throw new Error('Error!');
    }
}