import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from 'src/common/configuration/configuration.module';
import { ConfigurationService } from 'src/common/configuration/configuration.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => ({
        secret: config.jwtConfig,
      }),
    }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class AuthenticateModule {}
