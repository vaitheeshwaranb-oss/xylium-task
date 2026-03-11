import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ResponseInterface, SendMailInterface } from 'src/common/interface/response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import { GeneralEnum, UserEnum } from 'src/common/enum/enum';
import * as bcrypt from 'bcrypt';
import { SendMailDto, UserDetailDto } from './dto/user-details.dto';
import { UserDetail, UserDetailDocument } from './schema/user-details.schema';
import { JobService } from 'src/common/bull-queue/job/job.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(UserDetail.name) private readonly userDetailsModel: Model<UserDetailDocument>,
        private readonly jobService: JobService
    ) { }

    async createNewUser(createUserDto: UserDto): Promise<ResponseInterface> {
        const hash = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.userModel.create({
            email: createUserDto.email,
            password: hash,
        });

        return {
            message: UserEnum.CREATED,
            data: user
        }
    }

    async fetchAll(): Promise<ResponseInterface> {
        const users = await this.userModel.find({}, 'email').exec();
        return {
            message: UserEnum.RETRIVED,
            data: users
        }
    }

    async createUserDetails(createUserDetailDto: UserDetailDto): Promise<ResponseInterface> {
        const userDetails = new this.userDetailsModel(createUserDetailDto);
        await userDetails.save();

        return {
            message: UserEnum.CREATED,
            data: userDetails
        }
    }

    async sendMsg(msg: { message: string }): Promise<ResponseInterface> {
        await this.jobService.sendMsg(msg)
        return {
            message: "Send Message",
            data: "Send Message"
        }
    }

    async sendMail(send: SendMailDto): Promise<ResponseInterface> {
        await this.jobService.sendMail(send);
        return {
            message: "Send Mail",
            data: "Send Mail"
        }
    }

    async sendRepeat(msg: { message: string }): Promise<ResponseInterface> {
        await this.jobService.repeatSendQueue(msg);
        return {
            message: "Send Repeat Message",
            data: "Send Repeat Message"
        }
    }

    async relativeProduct(id: ObjectId): Promise<ResponseInterface> {
        const user = await this.userModel.find({}, 'email').exec();

        if (!user) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return {
            message: UserEnum.RETRIVED,
            data: {
                user,
            },
        }
    }

    async fetchByIdUserDetails(id: ObjectId): Promise<ResponseInterface> {
        const userDetail = await this.userDetailsModel.findOne({ user_id: id }, 'gender location, user_id').exec();

        if (!userDetail) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return {
            message: UserEnum.RETRIVED,
            data: userDetail,
        }
    }
}
