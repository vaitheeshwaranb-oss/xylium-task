import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UserDetailDto {
  @IsEnum(['male', 'female'])
  readonly gender!: string;

  @IsString()
  readonly location!: string;

  @IsString()
  readonly user_id!: string;
}

export class SendMailDto {
  @IsNotEmpty()
  readonly mail!: string;

  @IsNotEmpty()
  @IsString()
  readonly subject!: string;

  @IsNotEmpty()
  @IsString()
  readonly message!: string;
}
