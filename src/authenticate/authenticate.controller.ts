import { Body, Controller, Post } from '@nestjs/common';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { AuthDto } from './dto/auth.dto';
import { AuthenticateService } from './authenticate.service';

@Controller('auth')
export class AuthenticateController {

    constructor(
        private authService: AuthenticateService
    ) {}

    @Post('login')
    async login(@Body() authDto: AuthDto ): Promise<ResponseInterface> {
        return await this.authService.login(authDto);
    }

}
