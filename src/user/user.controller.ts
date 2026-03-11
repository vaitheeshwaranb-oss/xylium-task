import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { UserDto } from './dto/user.dto';
import { GeneralEnum } from 'src/common/enum/enum';
import { UserService } from './user.service';
import { SendMailDto, UserDetailDto } from './dto/user-details.dto';
import mongoose from 'mongoose';
import { VerifyUserGuard } from 'src/common/guards/verify-user.guard';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post()
    async createNewUser(@Body() createUserDto: UserDto): Promise<ResponseInterface> {
        if (!createUserDto) {
            throw new NotFoundException(GeneralEnum.NOT_FOUND);
        }

        return await this.userService.createNewUser(createUserDto); 
    }

    @Post('/send-msg')
    async sendMsg(@Body() msg: { message: string} ): Promise<ResponseInterface> {
        return await this.userService.sendMsg(msg);
    }

    @Post('/send-mail')
    async sendMail(@Body() send: SendMailDto): Promise<ResponseInterface> {
        return await this.userService.sendMail(send);
    }

    @Post('/send-repeat')
    async sendRepeat(@Body() msg: { message: string }): Promise<ResponseInterface> {
        return await this.userService.sendRepeat(msg);
    }

    @Get()
    async fetchAll(): Promise<ResponseInterface> {
        return await this.userService.fetchAll();
    }

    @Post('/user-details')
    async createUserDetails(@Body() createUserDetailDto: UserDetailDto): Promise<ResponseInterface> {
        if (!createUserDetailDto) throw new NotFoundException(GeneralEnum.NOT_FOUND);
        
        return await this.userService.createUserDetails(createUserDetailDto);
    }

    @Get('/relative-product/:id')
    async relativeProduct(@Param('id') id: mongoose.Schema.Types.ObjectId): Promise<ResponseInterface> {
        return await this.userService.relativeProduct(id);
    }

    @UseGuards(VerifyUserGuard)
    @Get('/user-details/:id')
    async fetchByIdUserDetails(@Param('id') id: mongoose.Schema.Types.ObjectId): Promise<ResponseInterface> {
        return await this.userService.fetchByIdUserDetails(id);
    }
}
