import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class ConfigurationService {
  private readonly dbHost: string;
  private readonly dbPort: number;
  private readonly dbName: string;
  private readonly dbUsername?: string;
  private readonly dbPassword?: string;

  private readonly $serverPort: number;

  constructor(private readonly configService: ConfigService) {
    this.dbHost = this.configService.get<string>('app.dbHost') ?? 'localhost';
    this.dbPort = this.configService.get<number>('app.dbPort') ?? 5434;
    this.dbName = this.configService.get<string>('app.dbName') ?? 'articles';
    this.dbUsername =
      this.configService.get<string>('app.dbUserName') ?? 'postgres';
    this.dbPassword = this.configService.get<string>('app.dbPassword') ?? '1';
    this.$serverPort = this.configService.get<number>('app.serverPort') ?? 3000;
  }

  public get serverPort(): number {
    return this.$serverPort;
  }

  public getPostgresURI(): string {
    return `postgresql://${this.dbUsername}:${this.dbPassword}@${this.dbHost}:${this.dbPort}/${this.dbName}`;
  }
}

export default ConfigurationService;
