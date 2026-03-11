import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get portConfig(): number {
        return this.configService.getOrThrow<number>('PORT');
    }

    get mongooseConfig(): { 'users': string, 'products': string } {
        return {
            users: this.configService.getOrThrow<string>('MONGOOSE_USER_URI'),
            products: this.configService.getOrThrow<string>('MONGOOSE_PRODUCT_URI'),
        }
    }

    get jwtConfig(): string {
        return this.configService.getOrThrow<string>('JWT_SCERET');
    }

    get redisConfig(): { 'host': string, 'port': number } {
        return {
            host: this.configService.getOrThrow<string>('REDIS_HOST'),
            port: this.configService.getOrThrow<number>('REDIS_PORT'),
        }
    }
}
