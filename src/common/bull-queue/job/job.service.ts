import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SendMailDto } from 'src/user/dto/user-details.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectQueue('messageQueue') private msgQueue: Queue,
    @InjectQueue('mailQueue') private mailQueue: Queue,
    @InjectQueue('repeatQueue') private repeatQueue: Queue,
  ) {}

  async sendMsg(msg: { message: string }) {
    await this.msgQueue.add(
      'send-msg',
      {
        message: msg.message,
      },
      {
        attempts: 3,
        backoff: {
          type: 'fixed',
          delay: 3000,
        },
      },
    );
  }

  async sendMail(send: SendMailDto) {
    await this.mailQueue.add(
      'send-mail',
      {
        message: send,
      },
      {
        priority: 10,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    );
  }

  async repeatSendQueue(msg: { message: string }) {
    await this.repeatQueue.add(
      'send-repeat',
      {
        message: msg,
      },
      {
        priority: 1,
        backoff: {
          type: 'fixed',
        },
        repeat: {
          // pattern: '* */1 * * * *',
          every: 5000,
        },
      },
    );
  }
}
