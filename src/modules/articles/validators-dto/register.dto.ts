import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  constructor(name: string, login: string, password: string) {
    this.email = name;
    this.password = password;
  }
}
