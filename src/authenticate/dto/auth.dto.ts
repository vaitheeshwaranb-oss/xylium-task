import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  readonly password!: string;
}
