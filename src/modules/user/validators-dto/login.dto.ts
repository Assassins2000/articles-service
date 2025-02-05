import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
