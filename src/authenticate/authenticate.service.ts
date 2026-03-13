import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthEnum } from 'src/common/enum/enum';
import { ResponseInterface } from 'src/common/interface/response.interface';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<ResponseInterface> {
    const logUser = await this.userModel
      .findOne({ email: authDto?.email }, '-_id email password')
      .exec();
    if (!logUser) throw new NotFoundException(AuthEnum.MUST_REGISTER);

    const isVaildPassword = await bcrypt.compare(
      authDto.password,
      logUser.password,
    );
    if (!isVaildPassword)
      throw new UnauthorizedException(AuthEnum.INVAILD_PASSWORD);

    const payload = {
      sub: logUser._id,
      email: logUser.email,
    };

    const _token = this.jwtService.sign(payload);

    return {
      message: AuthEnum.LOGIN,
      data: `Bearer ${_token}`,
    };
  }
}
